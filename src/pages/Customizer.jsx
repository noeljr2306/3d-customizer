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

// Icon map for editor tabs
const EditorTabIconMap = {
  colorpicker: Palette,
  filepicker: Upload,
};

// Icon map for filter tabs
const FilterTabIconMap = {
  logoShirt: Image,
  stylishShirt: Shirt,
};

// Icon accent colors per tab for styled active icons
const EditorTabAccentMap = {
  colorpicker: "#e85d8a",
  filepicker: "#4f9ef8",
};

const FilterTabAccentMap = {
  logoShirt: "#f59e42",
  stylishShirt: "#34d399",
};

// Tab button with active state, styled icons
const TabButton = ({
  tab,
  handleClick,
  isFilterTab = false,
  isActiveTab = false,
}) => {
  const IconMap = isFilterTab ? FilterTabIconMap : EditorTabIconMap;
  const AccentMap = isFilterTab ? FilterTabAccentMap : EditorTabAccentMap;
  const Icon = IconMap[tab.name];
  const accent = AccentMap[tab.name];

  const activeClass = isFilterTab
    ? isActiveTab
      ? "activeFilterTab"
      : ""
    : isActiveTab
      ? "activeEditorTab"
      : "";

  return (
    <button
      onClick={handleClick}
      className={`tab-btn ${activeClass}`}
      title={tab.name}
      style={isActiveTab && accent ? { "--tab-accent": accent } : {}}
    >
      {Icon ? (
        <span
          className="tab-icon-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isActiveTab ? `${accent}22` : "transparent",
            transition: "background 0.2s ease",
          }}
        >
          <Icon
            size={isActiveTab ? 19 : 18}
            strokeWidth={isActiveTab ? 2.2 : 1.8}
            color={isActiveTab ? accent : "currentColor"}
            style={{
              transition: "color 0.15s ease, filter 0.15s ease",
              filter: isActiveTab ? `drop-shadow(0 0 5px ${accent}88)` : "none",
            }}
          />
        </span>
      ) : (
        <span>{tab.name}</span>
      )}
    </button>
  );
};

// Back button
const BackButton = ({ handleClick }) => (
  <button
    onClick={handleClick}
    className="flex items-center gap-2 px-4 py-2.5 font-bold text-sm bg-black text-white hover:opacity-80 transition-opacity"
  >
    <ArrowLeft size={16} />
    Go Back
  </button>
);

// Download button
const DownloadButton = () => (
  <button
    onClick={downloadCanvasToImage}
    className="flex items-center gap-2 px-4 py-2.5 font-bold text-sm bg-white border text-black hover:opacity-80 transition-opacity shadow"
    title="Download"
  >
    <Download size={16} />
  </button>
);

// Tab panel wrapper with X close button
const TabPanel = ({ children, onClose }) => (
  <div style={{ position: "relative" }}>
    <button
      onClick={onClose}
      className="tab-close-btn"
      title="Close"
      aria-label="Close tab"
    >
      <X size={11} strokeWidth={2.5} />
    </button>
    {children}
  </div>
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
        content = (
          <FilePicker file={file} setFile={setFile} readFile={readFile} />
        );
        break;
      default:
        return null;
    }

    return (
      <TabPanel onClose={() => setActiveEditorTab("")}>{content}</TabPanel>
    );
  };



  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
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
          {/* Left Editor Tabs */}
          <_motion.div
            key="custom"
            className="absolute top-0 left-8 z-10"
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
                        prev === tab.name ? "" : tab.name,
                      )
                    }
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </_motion.div>

          {/* Top-right: Go Back + Download */}
          <_motion.div
            className="absolute z-10 top-5 right-5 flex gap-2"
            {...fadeAnimation}
          >
            <DownloadButton />
            <BackButton handleClick={() => (state.intro = true)} />
          </_motion.div>

          {/* Bottom Filter Tabs */}
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

