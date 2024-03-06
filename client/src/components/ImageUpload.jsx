import React, { useEffect, useRef } from "react";
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } from "../utils/constants";

const ImageUpload = ({ setAdditionalDetails }) => {
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
          setAdditionalDetails((prevState) => ({
            ...prevState,
            profilePic: res.info.secure_url,
          }));
        } else {
          // ignore
        }
      }
    );
  }, []);
  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          return widgetRef.current.open();
        }}
      >
        Upload Images
      </button>
    </>
  );
};
export default ImageUpload;
