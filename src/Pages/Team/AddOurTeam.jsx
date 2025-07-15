import { useState } from "react";
import Modal from "../../Component/common/Modal";
import JoditEditor from "jodit-react";

function AddOurTeam({ isOpen, onClose, onSuccess }) {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview("");
        }
    };

    const handleSubmit = () => {
        const newEntry = {
            name,
            designation,
            description,
            imageFile,
            imagePreview,
            socialLinks: {
                facebook,
                twitter,
                linkedin,
                instagram,
            },
        };

        onSuccess?.(newEntry);
        onClose();

        setName("");
        setDesignation("");
        setDescription("");
        setImageFile(null);
        setImagePreview("");
        setFacebook("");
        setTwitter("");
        setLinkedin("");
        setInstagram("");
    };

    return (
        <Modal title="Add Team Member" isOpen={isOpen} onClose={onClose} size="lg">
            <div className="space-y-4">
                <div className="flex flex-col items-center">
                    <label htmlFor="teamImageUpload" className="cursor-pointer">
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
                        id="teamImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>


                {/* Name */}
                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Designation */}
                <div>
                    <label className="block font-medium mb-1">Designation</label>
                    <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="Enter designation"
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <JoditEditor
                        value={description}
                        onChange={(val) => setDescription(val)}
                    />
                </div>

                {/* Social Media Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Facebook</label>
                        <input
                            type="url"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="Facebook URL"
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Twitter</label>
                        <input
                            type="url"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="Twitter URL"
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">LinkedIn</label>
                        <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="Linkedin URL"
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Instagram</label>
                        <input
                            type="url"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="Instagram URL"
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 cursor-pointer rounded"
                        onClick={onClose}
                    >
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

export default AddOurTeam;
