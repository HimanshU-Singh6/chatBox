import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { getUserChat } from "./api/api";
import { login } from "./features/authSlice";
import { addChatUser } from "./features/userSlice";

function App() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };
  useEffect(() => {
    if (token && user && username) {
      dispatch(login({user,token,username}))
      navigate('/')
    } else {
      navigate("/login");
    }
  }, []);
  
  useEffect(()=>{
    ;(async ()=>{
      try {
        if(!isLoggedIn) return;
        const res = await getUserChat();
        const data = res?.data;

        if(data?.statusCode === 200){
          data.data.map((obj)=>{
            dispatch(addChatUser(obj))
          })
        }
      } catch (error) {
        console.error("chat error ",error);
      }
    })();
  },[isLoggedIn])

  
  useEffect(() => {
    // seedData();
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
