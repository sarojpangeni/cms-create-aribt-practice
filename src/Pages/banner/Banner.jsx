import { useLocation, useNavigate } from "react-router-dom";

function Banner() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">No banner data found. Please submit the form first.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          onClick={() => navigate("/addbanner")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h1 className="text-2xl font-bold mb-4">Submitted Banner</h1>
      <div>
        <label className="font-medium">Title:</label>
        <p className="text-gray-700">{data.title}</p>
      </div>
      <div>
        <label className="font-medium">Sub Title:</label>
        <p className="text-gray-700">{data.subTitle}</p>
      </div>
      <div>
        <label className="font-medium">External Link:</label>
        <p className="text-blue-700">{data.link}</p>
      </div>
      <div>
        <label className="font-medium">Image Preview:</label>
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt="Banner"
            className="mt-2 rounded w-full max-h-64 object-cover"
          />
        ) : (
          <p className="text-gray-500 italic">No image selected</p>
        )}
      </div>
      <button
        onClick={() => navigate("/addbanner", { state: data })}
        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
      >
        Edit
      </button>
    </div>
  );
}

export default Banner;
