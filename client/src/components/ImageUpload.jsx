import React, { useEffect, useRef } from "react";
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } from "../utils/constants";

const ImageUpload = ({ setData }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
      {
        cloudName: CLOUDINARY_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        // maxFiles: 1,
      },
      (_, res) => {
        if (res.event === "success") {
          setData((prevState) => ({
            ...prevState,
            profilePic: res.info.secure_url,
          }));
        }
      }
    );
  }, []);
  return (
    <>
      <button
        className="btn btn-sm btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          return widgetRef.current.open();
        }}
      >
        Upload Image
      </button>
    </>
  );
};
export default ImageUpload;
