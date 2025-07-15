import React, { useState } from 'react';
import JoditEditor from 'jodit-react';

function Contact() {
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [isEditingMain, setIsEditingMain] = useState(false);
    const [contactMainData, setContactMainData] = useState(null);

    const handleMainEditClick = () => {
        if (contactMainData) {
            setContactNumber(contactMainData.contactNumber);
            setEmail(contactMainData.email);
            setAddress(contactMainData.address);
            setIsEditingMain(true);
        }
    };

    const handleMainSubmit = (e) => {
        e.preventDefault();

        const newData = {
            contactNumber,
            email,
            address,
        };

        setContactMainData(newData);
        setIsEditingMain(false);

        // Clear form
        setContactNumber("");
        setEmail("");
        setAddress("");
    };

    return (
        <>
            <div className="mt-8 bg-white p-6 shadow rounded mx-auto space-y-4">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

                {contactMainData && !isEditingMain ? (
                    <div className="space-y-4">
                        <p><strong>Contact Number:</strong> {contactMainData.contactNumber}</p>
                        <p><strong>Email:</strong> {contactMainData.email}</p>
                        <p><strong>Address:</strong>{contactMainData.address}</p>

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
                            <label className="block font-medium mb-1">Contact Number</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="Enter contact number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border p-2 rounded"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Address</label>
                            <input type="text"
                                className='w-full border p-2 rounded'
                                value={address}
                                placeholder='Enter your address'
                                onChange={(e) => setAddress(e.target.value)}
                                required
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

export default Contact;
