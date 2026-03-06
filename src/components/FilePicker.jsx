import React from "react";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="filepicker-label">Upload an image</div>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="filepicker-input"
      />
      <label htmlFor="file-upload" className="filepicker-upload-btn">
        Choose File
      </label>
      {file && (
        <div className="filepicker-preview">
          <p className="filepicker-filename">{file.name}</p>
          <button
            className="filepicker-apply-btn"
            onClick={() => readFile("logo")}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default FilePicker;

