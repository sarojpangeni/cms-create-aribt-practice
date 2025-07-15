import React, { useState } from 'react';
import AddBlog from './AddBlog';
import { BlogHeading } from '../../tableHeading/BlogHeading';
import ComponentCard from '../../Component/common/ComponentCard';
import DynamicTable from '../../Component/table/DynamicTable';

function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAdd = () => setIsModalOpen(true);

  const handleEdit = (item) => {
    setSelectedItem(item);
    // TODO: handle edit logic
  };

  return (
    <>
      <ComponentCard
        title="Blog"
        buttonLabel="Add Blog"
        onButtonClick={handleAdd}
      >
        <DynamicTable
          headings={BlogHeading}
          data={blogData}
          onEdit={handleEdit}
        />
      </ComponentCard>

      <AddBlog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newBlog) => {
          setBlogData((prev) => [
            ...prev,
            {
              Image: newBlog.imagePreview,
              Name: newBlog.name,
              Title: newBlog.title,
              Date: newBlog.date,
              Description: newBlog.description,
              URL: newBlog.url,
            }
          ]);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

export default Blog;
