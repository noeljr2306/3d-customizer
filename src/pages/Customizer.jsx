import React, { useState } from "react";
import { AnimatePresence, motion as _motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { ColorPicker, FilePicker } from "../components";

import {
  Download,
  ArrowLeft,
  Palette,
  Upload,
  Image,
  Shirt,
  X,
} from "lucide-react";


const EditorTabIconMap = {
  colorpicker: Palette,
  filepicker: Upload,
};

const FilterTabIconMap = {
  logoShirt: Image,
  stylishShirt: Shirt,
};


const TabButton = ({
  tab,
  handleClick,
  isFilterTab = false,
  isActiveTab = false,
}) => {
  const IconMap = isFilterTab ? FilterTabIconMap : EditorTabIconMap;
  const Icon = IconMap[tab.name];

  const activeClass = isFilterTab
    ? isActiveTab ? "activeFilterTab" : ""
    : isActiveTab ? "activeEditorTab" : "";

  
  if (isFilterTab) {
    return (
      <button
        onClick={handleClick}
        className={`tab-btn ${activeClass}`}
        title={tab.name}
      >
        {Icon && (
          <Icon
            size={15}
            strokeWidth={isActiveTab ? 2.5 : 2}
          />
        )}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {tab.name === "logoShirt" ? "Logo" : "Full"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`tab-btn ${activeClass}`}
      title={tab.name}
    >
      {Icon ? (
        <Icon
          size={isActiveTab ? 20 : 18}
          strokeWidth={isActiveTab ? 2.5 : 1.8}
        />
      ) : (
        <span>{tab.name}</span>
      )}
    </button>
  );
};


const TabPanel = ({ children, onClose }) => (
  <div style={{ position: "relative" }}>
    <button
      onClick={onClose}
      className="tab-close-btn"
      title="Close"
      aria-label="Close tab"
    >
      <X size={11} strokeWidth={3} />
    </button>
    {children}
  </div>
);


const BackButton = ({ handleClick }) => (
  <button
    onClick={handleClick}
    className="neobtn neobtn-dark"
  >
    <ArrowLeft size={14} strokeWidth={2.5} />
    Go Back
  </button>
);


const DownloadButton = () => (
  <button
    onClick={downloadCanvasToImage}
    className="neobtn neobtn-light"
    title="Download"
  >
    <Download size={14} strokeWidth={2.5} />
  </button>
);


const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    if (!activeEditorTab) return null;

    let content;
    switch (activeEditorTab) {
      case "colorpicker":
        content = <ColorPicker />;
        break;
      case "filepicker":
        content = <FilePicker file={file} setFile={setFile} readFile={readFile} />;
        break;
      default:
        return null;
    }

    return (
      <TabPanel onClose={() => setActiveEditorTab("")}>
        {content}
      </TabPanel>
    );
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    Object.assign(state, { [decalType.stateProperty]: result });
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        Object.assign(state, { isLogoTexture: !activeFilterTab[tabName] });
        break;
      case "stylishShirt":
        Object.assign(state, { isFullTexture: !activeFilterTab[tabName] });
        break;
      default:
        Object.assign(state, { isLogoTexture: true, isFullTexture: false });
        break;
    }
    setActiveFilterTab((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <_motion.div
            key="custom"
            className="customizer-left absolute top-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <TabButton
                    key={tab.name}
                    tab={tab}
                    isActiveTab={activeEditorTab === tab.name}
                    handleClick={() =>
                      setActiveEditorTab((prev) =>
                        prev === tab.name ? "" : tab.name
                      )
                    }
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </_motion.div>

          <_motion.div
            className="customizer-topright"
            {...fadeAnimation}
          >
            <DownloadButton />
            <BackButton handleClick={() => (state.intro = true)} />
          </_motion.div>

          <_motion.div
            className="filtertabs-container absolute"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <TabButton
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </_motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;