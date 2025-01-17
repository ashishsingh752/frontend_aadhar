import React, { useState } from "react";
import { CaptureFinger } from "../../mfs100"; // Assuming `CaptureFinger` is a custom utility or library
import axios from "axios";

const Registerform = () => {
  const [formStatus, setFormStatus] = useState("");
  const [status, setStatus] = useState("");
  const [fingerprintImg, setFingerprintImg] = useState("");
  const [fingerprintKey, setFingerprintKey] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const captureFingerPrint = () => {
    try {
      const client = new CaptureFinger();
      if (client?.data?.AnsiTemplate) {
        setStatus("success");
        setFingerprintKey(client.data.AnsiTemplate);
        setFingerprintImg(client.data.BitmapData);
        setError("");
      } else {
        setStatus("error");
        setFingerprintKey("");
        setFingerprintImg("");
        setError("Failed to capture fingerprint.");
      }
    } catch (err) {
      setStatus("error");
      setFingerprintKey("");
      setFingerprintImg("");
      setError("An error occurred while capturing the fingerprint.");
    }
  };

  const register = async (e) => {
    e.preventDefault();

    if (!fingerprintImg) {
      setError("Fingerprint is required.");
      return;
    }

    const userData = {
      first_name: fname,
      last_name: lname,
      email,
      mobile,
      fingerprint_key: fingerprintKey,
      fingerprint_img: fingerprintImg,
    };

    try {
      const response = await axios.post(
        "https://backend-aadhar.onrender.com/api/user/register",
        userData
      );
      console.log("Response:", response);
      setFormStatus("success");
      setError("");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error("Registration error:", err);
      setFormStatus("failed");
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          JanSeva Sign Up
        </h1>
        <form onSubmit={register} className="space-y-4">
          <div className="flex gap-4">
            <input
              required
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div className="flex gap-4">
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={captureFingerPrint}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Capture Fingerprint
          </button>
          {fingerprintImg && (
            <div className="mt-4 text-center">
              <img
                src={`data:image/png;base64,${fingerprintImg}`}
                alt="Fingerprint"
                className="mx-auto h-20 w-20 object-contain border border-gray-300"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>
          {formStatus === "success" && (
            <p className="text-green-500 text-center text-sm mt-2">
              Registration successful! Reloading...
            </p>
          )}
          {formStatus === "failed" && (
            <p className="text-red-500 text-center text-sm mt-2">
              Registration failed. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registerform;
