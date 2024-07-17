import React, { useRef, useState } from "react";
import { Input } from "../components";
import { useForm } from "react-hook-form";
import { login } from "../features/authSlice";
import { loginUser } from "../api/api";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmission = async (data) => {
    try {
      const responce = await loginUser(data);
      const userData = responce.data?.data;
      if (userData) {
        localStorage.setItem("token", userData.accessToken);
        localStorage.setItem("user", JSON.stringify(userData.user));
        dispatch(login(userData.user, userData.accessToken));
        navigate("/");
        reset();
      } else {
        alert(responce.message);
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
      <div className="flex gap-3 justify-center">
        <p>don't have a account</p>
        <Link to={"/signup"} className="text-blue-700 capitalize hover:text-accent">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
