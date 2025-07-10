import { useState } from "react";
import ComponentCard from "../../Component/common/ComponentCard";
import DynamicTable from "../../Component/table/DynamicTable";
import AddOurTeam from "./AddOurTeam";
import { TeamHeading } from "../../tableHeading/TeamHeading";

const OurTeam = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleAddSuccess = (newEntry) => {
    const updated = [
      ...data,
      {
        "Profile Image": newEntry.imagePreview,
        Name: newEntry.name,
        Designation: newEntry.designation,
        Description: newEntry.description,
        Link: newEntry.link,
      },
    ];
    setData(updated);
    setOriginalData([...originalData, newEntry]);
    setModalOpen(false);
  };

  const handleEditClick = (row) => {
    const match = originalData.find((i) => i.name === row.Name);
    setEditItem(match);
    setEditModalOpen(true);
  };

  const handleEditSuccess = (updatedEntry) => {
    const updatedOriginal = originalData.map((item) =>
      item.name === updatedEntry.name ? updatedEntry : item
    );
    setOriginalData(updatedOriginal);

    const updatedData = updatedOriginal.map((item) => ({
      "Profile Image": item.imagePreview,
      Name: item.name,
      Designation: item.designation,
      Description: item.description,
      Link: item.link,
    }));
    setData(updatedData);
    setEditModalOpen(false);
  };

  return (
    <>
      <ComponentCard
        title="Our Team"
        buttonLabel="Add Member"
        onButtonClick={() => setModalOpen(true)}
      >
        <DynamicTable
          headings={TeamHeading}
          data={data}
          onEdit={handleEditClick}
        />
      </ComponentCard>

      <AddOurTeam
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {/* <EditTeamModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        editItem={editItem}
        onSuccess={handleEditSuccess}
      /> */}
    </>
  );
};

export default OurTeam;
