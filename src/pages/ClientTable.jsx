import React, { useState } from "react";

const ClientInfo = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dateOfApply: "",
    aadhar: "",
    mobile: "",
    email: "",
  });
  const [clients, setClients] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClients([...clients, { ...formData, id: Date.now() }]);
    setFormData({
      fullName: "",
      fatherName: "",
      dateOfApply: "",
      aadhar: "",
      mobile: "",
      email: "",
    });
  };

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleDownload = (client) => {
    const blob = new Blob([JSON.stringify(client, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${client.fullName}_info.json`;
    link.click();
  };

  return (
    <div className="min-h-screen p-5 w-full flex justify-normal  bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="p-5 w-full">
        <div className="mt-5">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Full Name</th>
                <th className="border border-gray-300 p-2">Father Name</th>
                <th className="border border-gray-300 p-2">Date of Apply</th>
                <th className="border border-gray-300 p-2">Aadhar Number</th>
                <th className="border border-gray-300 p-2">Mobile</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    {client.fullName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {client.fatherName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {client.dateOfApply}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {client.aadhar}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {client.mobile}
                  </td>
                  <td className="border border-gray-300 p-2">{client.email}</td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDownload(client)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Download
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
