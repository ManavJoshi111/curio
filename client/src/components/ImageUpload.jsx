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
      },
      (_, res) => {
        if (res.event === "success") {
          setAdditionalDetails((prevState) => ({
            ...prevState,
            imgUrls: res.info.secure_url,
          }));
        } else {
          console.log("error: ", res);
        }
        console.log("error: ", _);
      }
    );
    console.log("Current: ", widgetRef.current);
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
