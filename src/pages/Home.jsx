import { NavLink, Route } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-full  w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="flex flex-col justify-center items-center text-3xl font-bold text-black h-lvh space-y-7">
        <div>Now you are Successfully Logged in.</div>
        <div className="flex gap-5">
          <NavLink to="/client-registration">
            <div className="px-5 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-md">
              Add Client
            </div>
          </NavLink>
          <NavLink to="/client-info">
            <div className="px-5 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-md">
              Show All
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
