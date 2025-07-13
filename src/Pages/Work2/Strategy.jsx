import { useEffect, useState } from "react";
import ComponentCard from "../../Component/common/ComponentCard";
import DynamicTable from "../../Component/table/DynamicTable";
import { StrategyHeading } from "../../tableHeading/Strategyheading";
import AddStrategy from "./AddStrategy";

function Strategy() {
    const [strategyData, setStrategyData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [strategyMainData, setStrategyMainData] = useState(null);
    const [isEditingMain, setIsEditingMain] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const handleAdd = () => setIsModalOpen(true);
    const handleEdit = (item) => {
        setSelectedItem(item);
        // setEditModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : "");
    };

    const handleMainSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            imageName: image?.name || "",
            imageUrl: preview || "",
        };

        setStrategyMainData(newEntry);
        setIsEditingMain(false);
        setImage(null);
        setPreview("");
    };

    const handleMainEditClick = () => {
        if (strategyMainData) {
            setImage({ name: strategyMainData.imageName }); // optional
            setPreview(strategyMainData.imageUrl || "");
            setIsEditingMain(true);
        }
    };

    return (
        <>
            <ComponentCard
                title="Strategy"
                buttonLabel="Add Service"
                onButtonClick={handleAdd}
            >
                <DynamicTable
                    headings={StrategyHeading}
                    data={strategyData}
                    onEdit={handleEdit}
                />
            </ComponentCard>

            <AddStrategy
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={(newStrategy) => {
                    setStrategyData((prev) => [...prev, {
                        Icon: newStrategy.iconPreview,
                        Title: newStrategy.title,
                        Description: newStrategy.description,
                        link: newStrategy.link,
                    }]);
                    setIsModalOpen(false);
                }}
            />
            <div  className="mt-8 bg-white p-6 shadow rounded w-fulls mx-auto space-y-4">
                <h2 className="text-xl font-semibold mb-4">Strategy Image</h2>

                {strategyMainData && !isEditingMain ? (
                    <div className="space-y-4">
                        {strategyMainData.imageUrl && (
                            <img
                                src={strategyMainData.imageUrl}
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
    )
}

export default Strategy;
