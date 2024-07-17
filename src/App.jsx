import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { login } from "./features/authSlice";

function App() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (token && user) {
      dispatch(login(user,token))
      navigate('/')
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if(theme === "light") {
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  return (
    <>
      <button
        className=" z-10 fixed bg-primary text-white size-10 rounded-full flex justify-center items-center text-2xl m-4 right-0"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </button>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;