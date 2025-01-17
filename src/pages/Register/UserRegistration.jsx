import React, { useState } from "react";
import { CaptureFinger } from "../../mfs100";

const UserRegistration = () => {
  const [fingerprints, setFingerprints] = useState([
    { img: "", key: "", status: "" },
    { img: "", key: "", status: "" },
    { img: "", key: "", status: "" },
    { img: "", key: "", status: "" },
    { img: "", key: "", status: "" },
  ]);

  const [error, setError] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const captureFingerPrint = async (index) => {
    try {
      const client = new CaptureFinger();
      if (client?.data?.AnsiTemplate) {
        const updatedFingerprints = [...fingerprints];
        updatedFingerprints[index] = {
          img: client.data.BitmapData,
          key: client.data.AnsiTemplate,
          status: "success",
        };
        setFingerprints(updatedFingerprints);
        setError("");
      } else {
        const updatedFingerprints = [...fingerprints];
        updatedFingerprints[index] = { img: "", key: "", status: "error" };
        setFingerprints(updatedFingerprints);
        setError("Failed to capture fingerprint.");
      }
    } catch (err) {
      const updatedFingerprints = [...fingerprints];
      updatedFingerprints[index] = { img: "", key: "", status: "error" };
      setFingerprints(updatedFingerprints);
      setError("An error occurred while capturing the fingerprint.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fingerprints.some((fp) => fp.img === "")) {
      setError("Please capture all fingerprints before submitting.");
      return;
    }
    setFormStatus("success");
    console.log("Fingerprints Captured:", fingerprints);
    setTimeout(() => {
      setFormStatus("");
    }, 3000);
  };

  return (
    <div className="min-h-screen p-5 w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <form
        className="bg-gray-50 shadow-md rounded-md p-8 max-w-4xl w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Client Info.
        </h2>

        {/* Input Fields */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Father Name
            </label>
            <input
              type="text"
              placeholder="Father Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Apply
            </label>
            <input
              type="date"
              className="mt-1 block w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aadhar Number
            </label>
            <input
              type="text"
              placeholder="9999 9999 9999"
              maxLength={14}
              onInput={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                if (value.length > 4) {
                  value = value.replace(/(\d{4})(\d{1,4})/, "$1 $2"); // Add space after 4 digits
                }
                if (value.length > 9) {
                  value = value.replace(/(\d{4} \d{4})(\d{1,4})/, "$1 $2"); // Add space after 8 digits
                }
                e.target.value = value;
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="9999999999"
              maxLength={10}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email-id
            </label>
            <input
              type="email"
              placeholder="your_email@email.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Fingerprint Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {fingerprints.map((fp, index) => (
            <div
              key={index}
              className="p-4 rounded-md shadow-md flex flex-col items-center bg-white"
            >
              {fp.img ? (
                <img
                  src={`data:image/png;base64,${fp.img}`}
                  alt={`Fingerprint ${index + 1}`}
                  className="h-28 w-28 object-contain border border-gray-300"
                />
              ) : (
                <div className="h-28 w-28 bg-gray-200 flex items-center justify-center border border-gray-300">
                  <p className="text-gray-500 text-sm">No Image</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => captureFingerPrint(index)}
                className={`mt-4 w-full py-2 px-4 rounded-md transition ${
                  fp.status === "success"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {fp.status === "success" ? "Captured" : "Click"}
              </button>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>

        {/* Form Status */}
        {formStatus === "success" && (
          <p className="text-green-500 text-center text-sm mt-4">
            Form submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default UserRegistration;
