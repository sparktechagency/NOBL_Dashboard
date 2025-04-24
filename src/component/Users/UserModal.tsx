import React, { useState } from "react";
import { Button, Modal } from "antd";

const UserModal: React.FC = ({ isModalOpen, setIsModalOpen }: any) => {
  const [addedMamber, setAddedMamber] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
        onOk={addedMamber}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          {/* add mamber form */}

          <form className="flex flex-col justify-center items-center  ">
            {/* email  */}
            <div className="pt-6">
              <label className="block mb-2 text-black text-lg font-medium font-roboto">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-xs w-[500px] bg-[#f0f0f0]   p-4 text-gray-900 text-sm rounded-lg  block p-2.5dark:placeholder-gray-400  "
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
                type="name"
                id="name"
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400  "
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
                id="number"
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400  "
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
                type="email"
                id="email"
                className="shadow-xs bg-[#f0f0f0]  p-4 text-gray-900 text-sm rounded-lg  block w-[500px] p-2.5dark:placeholder-gray-400 dark:focus:ring-blue-500 "
                placeholder="Set a password"
                required
              />
            </div>
            <button type="submit" className="w-[500px] p-3 bg-[#4B5320] mt-12 mb-9 rounded-lg" onClick={()=> setAddedMamber(handleOk)}>ADD</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserModal;
