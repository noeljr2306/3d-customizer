import { motion as _motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import CustomButton from "../components/CustomButton";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <_motion.section className="home" {...slideAnimation("left")}>
          <_motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </_motion.header>

          <_motion.div className="home-content" {...headContainerAnimation}>
            <_motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S GET <br className="xl:block hidden" /> THIS CHANGE{" "}
                <br className="xl:block hidden" /> STARTED!
              </h1>
            </_motion.div>
            <_motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base leading-relaxed">
                Design a shirt that's <strong>truly one of a kind </strong>
                pick your colors, upload your artwork, and bring your vision to
                life with our real-time 3D customization tool.
              </p>

              <CustomButton
                type="filled"
                title="Customize It →"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-8 py-3.5 font-bold text-sm"
              />
            </_motion.div>
          </_motion.div>
        </_motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
