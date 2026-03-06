import { motion as _motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
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
          <_motion.header
            {...slideAnimation("down")}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--black)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2.5px solid var(--black)",
                boxShadow: "var(--shadow-sm)",
                flexShrink: 0,
              }}
            >
              <img
                src="./threejs.png"
                alt="logo"
                style={{
                  width: 18,
                  height: 18,
                  objectFit: "contain",
                  filter: "invert(1)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--black)",
              }}
            >
              Studio
            </span>
          </_motion.header>

          <_motion.div className="home-content" {...headContainerAnimation}>
            <_motion.div
              {...headTextAnimation}
              style={{ position: "relative" }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -10,
                  left: -2,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--black)",
                  opacity: 0.3,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                — 001
              </span>

              <h1 className="head-text">
                LET'S GET <br className="xl:block hidden" />
                THIS CHANGE <br className="xl:block hidden" />
                STARTED!
              </h1>

              <div
                style={{
                  marginTop: 10,
                  height: 4,
                  width: "clamp(48px, 10vw, 80px)",
                  background: "var(--black)",
                  boxShadow: "var(--shadow-sm)",
                }}
              />
            </_motion.div>

            <_motion.div
              {...headContentAnimation}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(16px, 3vw, 24px)",
              }}
            >
              <div
                style={{
                  maxWidth: "min(420px, calc(100vw - 48px))",
                  background: "var(--white)",
                  border: "2.5px solid var(--black)",
                  boxShadow: "var(--shadow-md)",
                  padding: "clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 16px)",
                  position: "relative",
                  marginTop: 10,
                }}
              >
                {/* Tag label */}
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    left: 10,
                    background: "var(--black)",
                    color: "var(--white)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "2px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  About
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(10px, 1.8vw, 12px)",
                    lineHeight: 1.75,
                    color: "#333",
                    margin: 0,
                  }}
                >
                  Design a shirt that's{" "}
                  <strong style={{ color: "var(--black)", fontWeight: 700 }}>
                    truly one of a kind
                  </strong>{" "}
                  — pick your colors, upload your artwork, and bring your vision
                  to life with our real-time 3D customization tool.
                </p>
              </div>

              <button
                onClick={() => (state.intro = false)}
                className="neobtn neobtn-dark"
                style={{
                  width: "fit-content",
                  padding: "clamp(10px, 1.8vw, 14px) clamp(18px, 3vw, 28px)",
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  gap: "clamp(6px, 1vw, 10px)",
                }}
              >
                Customize It
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "clamp(18px, 3vw, 22px)",
                    height: "clamp(18px, 3vw, 22px)",
                    border: "2px solid currentColor",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </button>
            </_motion.div>
          </_motion.div>
        </_motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
