import "react-quill/dist/quill.snow.css";

import {
  useAddPageMutation,
  useGetPageQuery,
} from "../../redux/apiSlices/admin/additionalSlices";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import Swal from "sweetalert2";

function AboutUs() {
  const { data: pages } = useGetPageQuery({
    params: {
      type: "About Us",
    },
  });

  const [updateText] = useAddPageMutation();
  const [value, setValue] = useState("");

  // Set initial content when pages are loaded
  useEffect(() => {
    if (pages?.data?.[0]?.text) {
      setValue(pages.data[0].text);
    }
  }, [pages]);

  const handleSave = async () => {
    try {
      await updateText({
        type: "About Us",
        text: value,
      }).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Content saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to save content:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save content.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="w-full">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="min-h-[300px] sm:min-h-[400px]"
          modules={{
            toolbar: [
              ["undo", "redo"],
              [{ font: [] }, { size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["clean"],
            ],
          }}
        />
      </div>

      <div className="flex justify-center sm:justify-end mt-5">
        <button className="text-white bg-[#4B5320] font-semibold text-lg sm:text-xl py-3 px-8 sm:px-28 rounded-md w-full sm:w-auto">
          Save
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
