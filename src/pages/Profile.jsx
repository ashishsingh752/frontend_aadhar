import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { gettoken } from "../Localstorage/Store";
import axios from "axios";
import { CaptureFinger } from "../mfs100";

const Profile = () => {
  const tokenvalue = gettoken();
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [fingerprint_img, setfingerprint_img] = useState("");
  const [fingerprint_key, setfingerprint_key] = useState("");
  const [userdata, setuserdata] = useState({});
  const [updateres, setupdateres] = useState(false);

  const sumbitprofile = async () => {
    const data = {
      first_name: fname,
      last_name: lname,
      email,
      mobile: number,
      fingerprint_key,
      fingerprint_img,
    };
    const response = await axios.patch(
      `https://backend-aadhar.onrender.com/api/user/${tokenvalue[0]._id}`,
      data
    );
    console.log("resons", response);
    setupdateres(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const CaptureFingerPrint = () => {
    try {
      const client = new CaptureFinger();
      if (client.data.AnsiTemplate) {
        setfingerprint_key(client.data.AnsiTemplate);
        setfingerprint_img(client.data.BitmapData);
      } else {
        setfingerprint_key("");
        setfingerprint_img("");
      }
    } catch (error) {
      setfingerprint_key("");
      setfingerprint_img("");
    }
  };

  useEffect(() => {
    const userinfo = async () => {
      let url = `https://backend-aadhar.onrender.com/api/user/${tokenvalue[0]._id}`;
      const response = await axios.get(url);
      console.log("user info", response);
      setuserdata(response.data.data);
      setfname(response.data.data.first_name);
      setlname(response.data.data.last_name);
      setemail(response.data.data.email);
      setnumber(response.data.data.mobile);
      setfingerprint_img(response.data.data.fingerprint_img);
      setfingerprint_key(response.data.data.fingerprint_key);
    };

    userinfo();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-6">
        <form>
          <div className="flex justify-between px-16 py-4">
            <div className="flex flex-col w-1/2 pr-2">
              <label htmlFor="firstName" className="mb-1 font-medium">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                className="p-2 border rounded"
                placeholder="Enter First Name"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <label htmlFor="lastName" className="mb-1 font-medium">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                className="p-2 border rounded"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e) => setlname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between px-16 py-4">
            <div className="flex flex-col w-1/2 pr-2">
              <label htmlFor="email" className="mb-1 font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border rounded"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <label htmlFor="number" className="mb-1 font-medium">
                Mobile No:
              </label>
              <input
                type="text"
                id="number"
                className="p-2 border rounded"
                placeholder="Enter Number"
                value={number}
                onChange={(e) => setnumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center px-16 py-4 border border-gray-300">
            <img
              src={`data:image/png;base64,${fingerprint_img}`}
              onClick={() => CaptureFingerPrint()}
              alt="Fingerprint"
              className="cursor-pointer w-48 h-52"
            />
          </div>
          <div className="flex justify-center px-16 py-4">
            <button
              type="button"
              onClick={() => sumbitprofile()}
              className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          {updateres && (
            <div
              className="w-11/12 px-4 py-2 mx-16 mt-4 text-white bg-green-500 rounded"
              role="alert"
            >
              Update Profile Successfully
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
