import React, { useRef, useState } from 'react';
import Modal from '../../Component/common/Modal';
import JoditEditor from 'jodit-react';

function AddBlog({ isOpen, onClose, onSuccess }) {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const editor = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview("");
        }
    };

    const handleSubmit = () => {
        if (!title.trim()) return;

        const newBlog = {
            image,
            imagePreview,
            name,
            title,
            date,
            description,
            url,
        };

        onSuccess?.(newBlog);
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setImage(null);
        setImagePreview("");
        setName("");
        setTitle("");
        setDate("");
        setDescription("");
        setUrl("");
    };

    return (
        <Modal title="Add Blog" isOpen={isOpen} onClose={onClose} size="lg">
            <div className="space-y-4">
                <div className="flex flex-col items-center">
                    <label htmlFor="blogImageUpload" className="cursor-pointer">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="w-28 h-28 object-cover rounded-full border shadow hover:opacity-80 transition"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border shadow hover:opacity-80 transition">
                                Click to Upload
                            </div>
                        )}
                    </label>
                    <input
                        id="blogImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter author name"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border p-2 rounded"
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
                    <label className="block font-medium mb-1">Blog URL</label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter the blog URL"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 cursor-pointer rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
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

export default AddBlog;
