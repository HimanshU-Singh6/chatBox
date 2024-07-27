import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DialogDefault({ open, handleClose }) {
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      onClick={handleClose}
      className="bg-black bg-opacity-70 text-text flex items-center justify-center fixed inset-0 z-50 m-0"
    >
      <div
        onClick={handleDialogClick}
        className="bg-primary text-white rounded-lg w-full max-w-lg relative"
      >
        <DialogHeader className="capitalize text-center">
          Select User
        </DialogHeader>
        <DialogBody className="flex justify-center items-center">
          <select name="users" id="users" className="text-black w-40 text-center">
            <option value="him">him</option>
          </select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
