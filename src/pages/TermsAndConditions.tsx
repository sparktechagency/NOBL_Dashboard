import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import {
  useAddPageMutation,
  useGetPageQuery,
} from "../../redux/apiSlices/admin/additionalSlices";

import ReactQuill from "react-quill";
import Swal from "sweetalert2";

function TermsAndConditions() {
  const { data: pages } = useGetPageQuery({
    params: {
      type: "Terms & Conditions",
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
        type: "Terms & Conditions",
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
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
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
      <div onClick={handleSave} className="text-right mt-5 ">
        <button className="text-white bg-[#4B5320] font-semibold text-xl py-3 px-28 rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}

export default TermsAndConditions;
