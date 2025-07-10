import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ComponentCard from "../../Component/common/ComponentCard";

function AddBanner() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const bannerData = location.state;

  useEffect(() => {
    if (bannerData) {
      setTitle(bannerData.title || "");
      setSubTitle(bannerData.subTitle || "");
      setLink(bannerData.link || "");
      setImage({ file: bannerData.imageName || "", previewUrl: bannerData.imageUrl || "" });
      setIsEditing(true);
    }
  }, [bannerData]);

  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  setImage({
    file,
    previewUrl: file ? URL.createObjectURL(file) : "",
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBanner = {
      title,
      subTitle,
      link,
      imageName: image?.file?.name || "",
      imageUrl: image ?.previewUrl || "",
    };
    navigate("/banner", { state: newBanner })
    console.log(newBanner)
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setSubTitle("");
    setLink("");
    setImage(null);
  };

  return (
    <ComponentCard title="Add Banner">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter the title for banner"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Sub Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter the subtitle for banner"
            required
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">External Link</label>
          <input
            type="text"
            name="link"
            className="w-full border rounded p-2"
            placeholder="Enter the URL"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Choose Image</label>
          <input type="file" onChange={handleFileChange} className="cursor-pointer border rounded p-2" />
          {image && (
            <p className="text-sm mt-1 text-gray-500">
              Selected: {image.file.name}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}

export default AddBanner;
