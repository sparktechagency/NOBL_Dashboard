import { Button } from "antd";
import React, { useState } from "react";
import UserTable from "../component/Users/UserTable";
import UserModal from "../component/Users/UserModal";
import PhotoAddModal from "../component/PhotoLibary/PhotoAddModal";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className=" flex justify-between items-center mt-5 mb-[43px]">
        <div className="flex justify-center">
          <input
            type="search"
            className="w-[534px] p-4 border border-[#D9D9D9]"
            placeholder="Search for user"
            name=""
            id=""
          />
          <button className="bg-[#4b5320] p-[18px]">
            <svg
              width="25"
              height="25"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.07143 11.4286H0.5V8.57143H9.07143V0H11.9286V8.57143H20.5V11.4286H11.9286V20H9.07143V11.4286Z"
                fill="white"
              />
            </svg>
          </button>
          {/* Add mamber modul */}
        </div>
        <button
          onClick={showModal}
          className="font-semibold text-base font-roboto text-white bg-[#4b5320] py-3 px-[63px]"
        >
          + Add member
        </button>
      </div>
      {/* user modal */}
      <UserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></UserModal>

      <UserTable></UserTable>
    </div>
  );
}

export default Users;
