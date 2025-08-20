import { Form, Input, Tabs, Upload, message } from "antd";
import { useEffect, useState } from "react";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/apiSlices/authApiSlices";

import type { TabsProps } from "antd";
import { useSearchParams } from "react-router-dom";
import uplodIcon from "../assets/Images/dashboard/edit.png";

// Tabs 1 type
type FieldType = {
  name?: string;
  address?: string;
};

// Tabs 2 type
type FieldTypePassTab = {
  old_password?: string;
  password?: string;
  c_password?: string;
};

const ChangePassword = () => {
  const { data: userData, isLoading: profileLoading } = useGetProfileQuery({});
  const [prams] = useSearchParams();
  let tab = prams.get("tab");
  const [tabKey, setTabKey] = useState(tab);
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const [form] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const handleProfileUpdate = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name || "");
      formData.append("address", values.address || "");
      if (fileToUpload) formData.append("photo", fileToUpload);

      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully");
      if (fileToUpload) setPreviewImage(URL.createObjectURL(fileToUpload));
      setFileToUpload(null);
    } catch (err) {
      message.error("Failed to update profile");
      console.error("Update profile error:", err);
    }
  };

  const handlePasswordReset = async (values: FieldTypePassTab) => {
    try {
      const response = await changePassword({
        password: values.password,
        old_password: values.old_password,
        c_password: values.c_password,
      }).unwrap();

      if (response?.status) formPassword.resetFields();
      message.success(response?.message || "Password changed successfully");
    } catch (err) {
      message.error("Failed to change password");
      console.error("Password change error:", err);
    }
  };

  const handleBeforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Please upload an image file");
      return false;
    }
    setPreviewImage(URL.createObjectURL(file));
    setFileToUpload(file);
    return false;
  };

  const onChange = (key: string) => {
    setTabKey(key === "2" ? "password" : "profile");
  };

  useEffect(() => {
    if (userData?.data) {
      form.setFieldsValue({
        name: userData.data.name || "",
        address: userData.data.address || "",
      });
      if (userData.data.photo) setPreviewImage(userData.data.photo);
    }
  }, [userData, form]);

  if (profileLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );

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
          className="w-full max-w-md mx-auto space-y-6"
        >
          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            label="Name"
            colon={false}
          >
            <Input
              placeholder="Write name"
              className="p-3 text-sm sm:text-base w-full rounded border border-gray-300"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
            label="Address"
            colon={false}
          >
            <Input
              placeholder="Write address"
              className="p-3 text-sm sm:text-base w-full rounded border border-gray-300"
            />
          </Form.Item>

          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#4B5320] text-white font-semibold text-base sm:text-lg py-2 px-6 rounded-md"
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
          className="w-full max-w-md mx-auto space-y-6"
        >
          {["old_password", "password", "c_password"].map((field, index) => (
            <Form.Item<FieldTypePassTab>
              key={field}
              name={field as keyof FieldTypePassTab}
              rules={[
                {
                  required: true,
                  message: `Please input ${field.replace("_", " ")}`,
                },
                ...(field === "c_password"
                  ? [
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value)
                            return Promise.resolve();
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]
                  : []),
              ]}
              label={field
                .replace("_", " ")
                .replace("c password", "Confirm password")}
              colon={false}
            >
              <Input.Password
                placeholder="**********"
                className="p-3 text-sm sm:text-base w-full rounded border border-gray-300"
              />
            </Form.Item>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#4B5320] text-white font-semibold text-base sm:text-lg py-2 px-6 rounded-md"
            >
              Save
            </button>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8">
      {/* Profile section */}
      <div className="bg-white rounded-lg flex flex-col items-center py-8 mb-8 w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={previewImage || userData?.data?.photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <Upload
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
            accept="image/*"
          >
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white flex justify-center items-center rounded-full shadow-md">
              <img src={uplodIcon} alt="Upload" className="w-5 h-5" />
            </button>
          </Upload>
        </div>
        <h3 className="mt-4 font-medium text-xl sm:text-2xl">
          {userData?.data?.name}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          {userData?.data?.email}
        </p>
        <p className="text-gray-500 text-sm sm:text-base">
          {userData?.data?.address}
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-md mx-auto">
        <Tabs
          size="small"
          activeKey={tabKey === "profile" ? "1" : "2"}
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
