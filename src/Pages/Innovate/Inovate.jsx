import { useState } from "react";
import ComponentCard from "../../Component/common/ComponentCard";
import { InnovateHeading } from "../../tableHeading/InnovateHeadings";
import DynamicTable from "../../Component/table/DynamicTable";
import AddInnovateModal from "./AddInovate";

const Innovate = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  return (
    <>
      <ComponentCard
        title="Innovate"
        buttonLabel="Add New"
        onButtonClick={() => setModalOpen(true)}
      >
        <DynamicTable
          headings={InnovateHeading}
          data={data}
          onEdit={(row) => {
            const match = originalData.find((i) => i.title === row.Title);
            setEditItem(match);
            setEditModalOpen(true);
          }}
        />
      </ComponentCard>

      <AddInnovateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={(newEntry) => {
          const updated = [
            ...data,
            {
              Title: newEntry.title,
              Description: newEntry.description,
              Items: newEntry.items.join(", "),
            },
          ];
          setData(updated);
          setOriginalData([...originalData, newEntry]);
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default Innovate;
