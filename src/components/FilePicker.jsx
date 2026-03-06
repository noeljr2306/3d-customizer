import React from "react";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#0a0a0a",
          margin: 0,
        }}
      >
        Upload Image
      </p>

      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "none" }}
      />

      <label htmlFor="file-upload" className="filepicker-label">
        Choose File
      </label>

      {file && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 4,
            flex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "#555",
              margin: 0,
              wordBreak: "break-all",
              lineHeight: 1.5,
            }}
          >
            {file.name}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <button
              className="filepicker-label"
              onClick={() => readFile("logo")}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              Logo
            </button>
            <button
              className="filepicker-label"
              onClick={() => readFile("full")}
              style={{
                textAlign: "center",
                cursor: "pointer",
                background: "var(--white)",
                color: "var(--black)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              Full Texture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePicker;
