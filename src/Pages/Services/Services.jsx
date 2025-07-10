import { useEffect, useState } from "react";
import { ServicesHeading } from "../../tableHeading/ServicesHeading";
import AddServices from "./AddServices";
import ComponentCard from "../../Component/common/ComponentCard";
import DynamicTable from "../../Component/table/DynamicTable";
// import EditServices from "./EditServices";
// import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

function Services() {
    const [servicesData, setServicesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //   const [editModalOpen, setEditModalOpen] = useState(false);
    //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAdd = () => setIsModalOpen(true);
    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };
    //   const handleDelete = (item) => {
    //     setSelectedItem(item);
    //     setIsDeleteModalOpen(true);
    //   };

    return (
        <>
            <ComponentCard
                title="Our Services"
                buttonLabel="Add Service"
                onButtonClick={handleAdd}
            >
                <DynamicTable
                    headings={ServicesHeading}
                    data={servicesData}
                    onEdit={handleEdit}
                //   onDelete={handleDelete}
                />
            </ComponentCard>

            <AddServices
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={(newService) => {
                    setServicesData((prev) => [...prev, {
                        Icon: newService.iconPreview,
                        Title: newService.title,
                        Description: newService.description,
                        link: newService.link,
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
        </>
    );
}

export default Services;
