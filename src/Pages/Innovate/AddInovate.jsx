import React, { useState } from 'react';
import Modal from '../../Component/common/Modal';
import JoditEditor from 'jodit-react';
import { X } from 'lucide-react';

function AddInnovateModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (!itemInput.trim()) return;
    setItems([...items, itemInput.trim()]);
    setItemInput("");
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Submitting:", { title, description, items });
    const newData = {
      title,
      description,
      items,
    };
    onSuccess?.(newData);
    onClose();
    setTitle("");
    setDescription("");
    setImage(null);
    setItemInput("");
    setItems([]);
  };

  return (
    <Modal title="Add Innovate Title" isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Innovate Title</label>
          <input
            name="innovateTitle"
            placeholder="Enter innovate title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Innovate Description</label>
          <JoditEditor
            value={description}
            onChange={(newContent) => setDescription(newContent)}
          />
        </div>

        {/* Items Input */}
        <div>
          <label className="block font-medium mb-1">Items</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add item"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              className="flex-1 border rounded p-2"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 bg-blue-600 text-white rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Items List */}
        {items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove item"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button className="px-4 py-2 bg-gray-300 cursor-pointer rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddInnovateModal;
