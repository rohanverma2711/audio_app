import React, { useState } from "react";

const Modal = (props) => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [imgsrc, setImageSrc] = useState("");

  const handleSongNameChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSourceNameChange = (e) => {
    setSource(e.target.value);
  };

  const handleSourceLinkChange = (e) => {
    setUrl(e.target.value);
  };
  const handleImageSourceChange = (e) => {
    setImageSrc(e.target.value);
  };

  const handleSubmit = () => {
    const newSong = {
      title,
      source,
      url,
      imgsrc,
    };

    // Call the addSong function passed as a prop
    props.handleAddSong(newSong);

    // Close the modal
    props.onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-background fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <span
            className="close absolute top-0 right-0 mt-4 mr-4 text-gray-600 cursor-pointer"
            onClick={props.onClose}
          >
            &times;
          </span>
          <h2 className="text-2xl font-bold mb-4">Add a Song</h2>
          <div className="mb-4">
            <label
              htmlFor="songName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Song Name
            </label>
            <input
              type="text"
              id="songName"
              className="w-full border rounded py-2 px-3"
              placeholder="Enter song name"
              value={title}
              onChange={handleSongNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sourceName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Source Name
            </label>
            <input
              type="text"
              id="sourceName"
              className="w-full border rounded py-2 px-3"
              placeholder="Enter source name"
              value={source}
              onChange={handleSourceNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sourceLink"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Source Link
            </label>
            <input
              type="text"
              id="sourceLink"
              className="w-full border rounded py-2 px-3"
              placeholder="Enter source link"
              value={url}
              onChange={handleSourceLinkChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imgsrc"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Image source
            </label>
            <input
              type="text"
              id="imgsrc"
              className="w-full border rounded py-2 px-3"
              placeholder="Enter source link"
              value={imgsrc}
              onChange={handleImageSourceChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
