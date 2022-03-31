import { useRef } from 'react';
import Head from "next/head";
import Script from "next/script";

const CloudinaryUploadWidget = ({ callback, children }) => {
  const cloudinary = useRef();

  function showWidget() {
    const widget = cloudinary.current?.createUploadWidget(
      {
        cloudName: "vercel-platforms",
        uploadPreset: "w0vnflc6",
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          callback(result.info);
        }
      }
    );

    widget && widget.open();
  }

  function open(e) {
    e.preventDefault();
    showWidget();
  }

  function handleOnLoad() {
    cloudinary.current = window.cloudinary;
  }

  return (
    <>
      {children({ open })}
      <Script
        id="cloudinary"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={handleOnLoad}
      />
    </>
  )
}

export default CloudinaryUploadWidget;