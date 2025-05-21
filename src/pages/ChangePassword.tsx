import { Form, Input, Tabs, Upload, message } from "antd";
import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useResetPasswordMutation,
  useUpdateProfileMutation,
} from "../../redux/apiSlices/authApiSlices";

import type { TabsProps } from "antd";
import uplodIcon from "../assets/Images/dashboard/edit.png";

// tabs 1 type
type FieldType = {
  name?: string;
  address?: string;
};

// tabs 2 type
type FieldTypePassTab = {
  password?: string;
  c_password?: string;
};

const ChangePassword = () => {
  const { data: userData, isLoading: profileLoading } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [form] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Handle profile update
  const handleProfileUpdate = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name || "");
      formData.append("address", values.address || "");

      if (fileToUpload) {
        formData.append("photo", fileToUpload);
      }

      const response = await updateProfile(formData).unwrap();
      message.success("Profile updated successfully");

      // Update the preview image if a new one was uploaded
      if (fileToUpload) {
        setPreviewImage(URL.createObjectURL(fileToUpload));
      }

      // Reset the file upload state
      setFileToUpload(null);
    } catch (err) {
      message.error("Failed to update profile");
      console.error("Update profile error:", err);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (values: FieldTypePassTab) => {
    try {
      await resetPassword({
        password: values.password,
        c_password: values.c_password,
      }).unwrap();
      message.success("Password changed successfully");
      formPassword.resetFields();
    } catch (err) {
      message.error("Failed to change password");
      console.error("Password change error:", err);
    }
  };

  // Handle before image upload
  const handleBeforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Please upload an image file");
      return false;
    }

    setPreviewImage(URL.createObjectURL(file));
    setFileToUpload(file);
    return false; // prevents auto upload
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    console.log("User Data:", userData); // Debug log to verify data
    if (userData?.data) {
      form.setFieldsValue({
        name: userData.data.name || "",
        address: userData.data.address || "",
      });
      if (userData.data.photo) {
        setPreviewImage(userData.data.photo);
      }
    }
  }, [userData, form]);

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit profile",
      children: (
        <Form
          form={form}
          onFinish={handleProfileUpdate}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            className="mb-7"
            colon={false}
            label="Name"
          >
            <Input
              placeholder="Write name"
              className="p-4 border-none text-sm text-gray-900 font-medium w-[1112px] bg-[#ffffff]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
            colon={false}
            label="Address"
          >
            <Input
              placeholder="Write address"
              className="p-4 border-none text-sm text-gray-900 font-medium w-[1112px] bg-[#ffffff]"
            />
          </Form.Item>

          <div className="text-center mt-5 ">
            <button
              type="submit"
              className="text-white bg-[#4B5320] font-semibold font-popping text-xl py-2 px-10 rounded-md"
            >
              Save
            </button>
          </div>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <Form
          form={formPassword}
          onFinish={handlePasswordReset}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldTypePassTab>
            name="password"
            rules={[{ required: true, message: "Please input new password" }]}
            className="mb-7 "
            colon={false}
            label="New password"
          >
            <Input.Password
              placeholder="**********"
              className="p-4 text-sm text-gray-900 font-medium border-none w-[1112px] bg-[#ffffff]"
            />
          </Form.Item>

          <Form.Item<FieldTypePassTab>
            name="c_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
            colon={false}
            label="Confirm new password"
          >
            <Input.Password
              placeholder="**********"
              className="p-4 text-sm text-gray-900 font-medium border-none w-[1112px] bg-[#ffffff]"
            />
          </Form.Item>

          <div className="text-center mt-5 ">
            <button
              type="submit"
              className="text-white bg-[#4B5320] font-semibold font-popping text-xl py-2 px-10 rounded-md"
            >
              Save
            </button>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <div>
      {/* profile section  */}
      <div className="bg-white mx-52 mt-5 rounded-lg flex flex-col justify-center items-center py-8">
        <div className="relative">
          <img
            src={previewImage || userData?.data?.photo}
            alt="Profile"
            className="w-[137px] rounded-full h-[137px] object-cover"
          />

          <Upload
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
            accept="image/*"
          >
            <button
              type="button"
              className="w-8 bg-white flex justify-center items-center p-2 shadow-lg rounded-full absolute right-0 bottom-5"
            >
              <img src={uplodIcon} className="w-5" alt="Upload" />
            </button>
          </Upload>
        </div>
        <h3 className="font-roboto font-medium text-[30px]">
          {userData?.data?.name}
        </h3>
        <p className="text-[#B1A8A8] font-roboto font-medium text-xl">
          {userData?.data?.email}
        </p>
        <p className="text-[#B1A8A8] font-roboto font-medium text-xl">
          {userData?.data?.address}
        </p>
      </div>

      {/* tabs */}
      <div className="mx-52">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default ChangePassword;
