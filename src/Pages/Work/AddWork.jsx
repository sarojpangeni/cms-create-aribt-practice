import React, { useState } from "react";
import Modal from "../../Component/common/Modal";

function AddWork({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !subTitle.trim()) return;

    const newWork = {
      title,
      subTitle,
      imageName: image?.name || "",
      imagePreview: previewUrl,
    };

    onSuccess?.(newWork);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setSubTitle("");
    setImage(null);
    setPreviewUrl("");
  };

  return (
    <Modal title="Add Our Work" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter work title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Sub Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter work subtitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Choose Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="cursor-pointer border rounded p-2 w-full"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 max-h-60 object-contain rounded"
            />
          )}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddWork;
