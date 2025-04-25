import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AboutUs() {
  const [value, setValue] = useState("");

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
      <div className="text-right mt-5 ">
        <button className="text-white bg-[#4B5320]  font-semibold font-popping text-xl py-3 px-28 rounded-md ">
          Save
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
