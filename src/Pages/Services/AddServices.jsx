import { useState, useRef } from "react";
import Modal from "../../Component/common/Modal";
import JoditEditor from "jodit-react";

export default function AddServices({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const editor = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }

    const newService = {
      title,
      description,
      link,
      iconName: iconFile?.name || "",
      iconPreview: previewUrl,
    };

    onSuccess?.(newService); // send data back to parent
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setIconFile(null);
    setPreviewUrl("");
  };

  return (
    <Modal title="Add Service" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <JoditEditor
            ref={editor}
            value={description}
            onChange={(content) => setDescription(content)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">External Link</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter URL (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Choose Icon</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="cursor-pointer border rounded p-2 w-full"
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
