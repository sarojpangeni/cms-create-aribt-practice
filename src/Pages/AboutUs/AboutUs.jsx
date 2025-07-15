import { useState } from "react";
import ComponentCard from "../../Component/common/ComponentCard";
import DynamicTable from "../../Component/table/DynamicTable";
import AddAboutus from "./AddAboutUs";
import { AboutUsHeading } from "../../tableHeading/AboutUsHeading";
import JoditEditor from "jodit-react";

function AboutUs() {
    const [aboutUsData, setAboutUsData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [aboutUsMainData, setAboutUsMainData] = useState(null);
    const [isEditingMain, setIsEditingMain] = useState(false);

    const handleAdd = () => setIsModalOpen(true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : "");
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        // setEditModalOpen(true);
    };
    //   const handleDelete = (item) => {
    //     setSelectedItem(item);
    //     setIsDeleteModalOpen(true);
    //   };

    const handleMainSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            description,
            imageName: image?.name || "",
            imageUrl: preview || "",
        };

        setAboutUsMainData(newEntry);
        setIsEditingMain(false);
        setDescription("");
        setImage(null);
        setPreview("");
    };

    const handleMainEditClick = () => {
        if (aboutUsMainData) {
            setDescription(aboutUsMainData.description);
            setImage({ name: aboutUsMainData.imageName }); // optional
            setPreview(aboutUsMainData.imageUrl || "");
            setIsEditingMain(true);
        }
    };

    return (
        <>
            <ComponentCard
                title="About Us"
                buttonLabel="Add About Us"
                onButtonClick={handleAdd}
            >
                <DynamicTable
                    headings={AboutUsHeading}
                    data={aboutUsData}
                    onEdit={handleEdit}
                //   onDelete={handleDelete}
                />
            </ComponentCard>

            <AddAboutus
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={(newAboutUs) => {
                    setServicesData((prev) => [...prev, {
                        Icon: newAboutUs.iconPreview,
                        Title: newAboutUs.title,
                        Description: newAboutUs.description,
                        link: newAboutUs.link,
                    }]);
                    setIsModalOpen(false);
                }}
            />

            {/* <EditServices
        isOpen={editModalOpen}
        editItem={selectedItem}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => fetchServicesData(pagination.pageNumber)}
      /> */}

            {/* <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Delete "${selectedItem?.title}"?`}
        description="Are you sure you want to delete this service?"
        onDelete={() =>
          deleteServiceApi(selectedItem.id).then(() =>
            fetchServicesData(pagination.pageNumber)
          )
        }
      /> */}

            <div className="mt-8 bg-white p-6 shadow rounded mx-auto space-y-4">
                <h2 className="text-xl font-semibold mb-4">About Us Description</h2>

                {aboutUsMainData && !isEditingMain ? (
                    <div className="space-y-4">
                        <div dangerouslySetInnerHTML={{ __html: aboutUsMainData.description }} className="prose max-w-none" />
                        {aboutUsMainData.imageUrl && (
                            <img
                                src={aboutUsMainData.imageUrl}
                                alt="About Us"
                                className="mt-2 cursor-pointer max-h-60 rounded"
                            />
                        )}
                        <div className="flex justify-end">
                            <button
                                onClick={handleMainEditClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleMainSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Description</label>
                            <JoditEditor
                                value={description}
                                onChange={(val) => setDescription(val)}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Upload Image</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="border cursor-pointer p-2 rounded"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2  max-h-60 rounded"
                                />
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                            >
                                {isEditingMain ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default AboutUs;
