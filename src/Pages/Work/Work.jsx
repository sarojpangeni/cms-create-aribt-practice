import { useState } from "react";
import ComponentCard from "../../Component/common/ComponentCard";
import DynamicTable from "../../Component/table/DynamicTable";
import AddWork from "./AddWork";
import { WorkHeading } from "../../tableHeading/WorkHeading";
import JoditEditor from "jodit-react";

function Work() {
    const [ourWorkData, setOurWorkData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [workMainData, setWorkMainData] = useState(null);
    const [description, setDescription] = useState("");
    const [isEditingMain, setIsEditingMain] = useState(false);



    const handleAdd = () => setIsModalOpen(true);
    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleMainSubmit = (e) => {
        e.preventDefault();

        const newEntry = { description };

        setWorkMainData(newEntry);
        setIsEditingMain(false);
        setDescription("");
    };

    const handleMainEditClick = () => {
        if (workMainData) {
            setDescription(workMainData.description);
            setIsEditingMain(true);
        }
    };

    return (
        <>
            <ComponentCard
                title="Our Work"
                buttonLabel="Add Work"
                onButtonClick={handleAdd}
            >
                <DynamicTable
                    headings={WorkHeading}
                    data={ourWorkData}
                    onEdit={handleEdit}
                />
            </ComponentCard>

            <AddWork
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={(newWork) => {
                    setOurWorkData((prev) => [
                        ...prev,
                        {
                            Image: newWork.imagePreview,
                            Title: newWork.title,
                            "Sub Title": newWork.subTitle,
                        },
                    ]);
                    setIsModalOpen(false);
                }}
            />
            <div className="mt-8 bg-white p-6 shadow rounded w-fulls mx-auto space-y-4">
                <h2 className="text-xl font-semibold mb-4">Our Work Description</h2>
                {workMainData && !isEditingMain ? (
                    <div className="space-y-4">
                        <div dangerouslySetInnerHTML={{ __html: workMainData.description }} className="prose max-w-none" />
                        <div className="flex justify-end">
                            <button
                                onClick={handleMainEditClick}
                                className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-700"
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

export default Work;
