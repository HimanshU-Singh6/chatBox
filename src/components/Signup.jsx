import React, { useRef, useState } from "react";
import { Input } from "../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signupUser,loginUser } from "../api/api";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmission = async (data) => {
    try {
      const responce = await signupUser(data);
      console.log(responce)
      console.log(responce.data.success)
      if(responce.data.success) {
        const {username, password} = data;
        const res = await loginUser({username, password});
        const userData = res.data?.data
       if(userData) {
        localStorage.setItem("token", userData.accessToken);
        localStorage.setItem("user", JSON.stringify(userData.user));
        dispatch(login(userData.user, userData.accessToken));
        navigate("/");

       }
      }else {
        alert("signup failed")
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-wrap justify-center flex-col items-center gap-5 min-h-screen">
      <div className="flex flex-wrap">
        <form
          onSubmit={handleSubmit(formSubmission)}
          className="max-w-sm mx-auto flex justify-center flex-wrap flex-col"
        >
          <div className="mb-5">
            <Input
              placeholder="username"
              type="text"
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && <p role="alert">this field is required</p>}
          </div>
          <div className="mb-5">
            <Input
              placeholder="email"
              type="text"
              {...register("email", {
                required: true,
              })}
            />
            {errors.username && <p role="alert">this field is required</p>}
          </div>
          <div className="mb-5">
            <Input
              placeholder="password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && <p role="alert">this field is required</p>}
          </div>

          <button
            type="submit"
            className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>

        <div></div>
      </div>
    </div>
  );
};

export default Signup;
