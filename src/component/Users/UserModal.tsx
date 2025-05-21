import React, { useState } from "react";

import { Modal } from "antd";
import Swal from "sweetalert2";
import { useAddUserMutation } from "../../../redux/apiSlices/admin/userSlices";

const UserModal: React.FC<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}> = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    badge_number: "",
    password: "",
  });

  const [addNewUser] = useAddUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      if (
        !formData.email ||
        !formData.user_name ||
        !formData.badge_number ||
        !formData.password
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields!",
        });
        return;
      }

      // Call the API
      await addNewUser(formData).unwrap();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User added successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      // Close modal and reset form
      setIsModalOpen(false);
      setFormData({
        email: "",
        user_name: "",
        badge_number: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add user. Please try again.",
      });
      console.error("Failed to add user:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-0 p-0">
      <Modal
        width={569}
        height={400}
        title={
          <div className="text-center bg-[#4b5320] text-white py-4 font-roboto text-[18px]  font-semibold rounded-t-lg">
            Add a member
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="rounded-b-lg">
          {/* add mamber form - EXACTLY THE SAME DESIGN AS BEFORE */}
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            {/* email  */}
            <div className="pt-6">
              <label className="block mb-2 text-black text-lg font-medium font-roboto">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400 dark:focus:ring-blue-500 "
                placeholder="name@flowbite.com"
                required
              />
            </div>
            {/* Username add */}
            <div className="pt-6">
              <label className="block mb-2 text-black text-lg font-medium font-roboto">
                Username
              </label>
              <input
                type="text"
                id="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400 dark:focus:ring-blue-500 "
                placeholder="Set an username"
                required
              />
            </div>
            {/* Badge Number */}
            <div className="pt-6">
              <label className="block mb-2 text-black text-lg font-medium font-roboto">
                Badge Number
              </label>
              <input
                type="number"
                id="badge_number"
                value={formData.badge_number}
                onChange={handleInputChange}
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400 dark:focus:ring-blue-500 "
                placeholder="5468437"
                required
              />
            </div>
            {/* Password */}
            <div className="pt-6">
              <label className="block mb-2 text-black text-lg font-medium font-roboto">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400 dark:focus:ring-blue-500 "
                placeholder="Set a password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-[500px] p-3 bg-[#4B5320] mt-12 mb-9 rounded-lg text-white"
            >
              ADD
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserModal;
