import React from "react";
import { Input, Button } from "../components";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";

const Msg = ({onFormSubmit}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendChat =  (data) => {
    onFormSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(sendChat)} className="flex flex-row flex-wrap w-full">
    <div className="flex flex-wrap justify-center  items-center  gap-4 mx-4 w-full">
      <Input autoComplete="off" className={"!w-11/12 capitalize"}  placeholder={"message"} {...register("message",{
        required: true,
        maxLength: 1000,
        minLength: 1,      })}  />
      <Button type={"submit"} className={"!max-w-1/12 bg-accent size-10 flex justify-center items-center text-2xl rounded-full p-0 mr-0 hover:bg-secondary"}><IoSend /></Button>
    </div>
    </form>
  );
};

export default Msg;
