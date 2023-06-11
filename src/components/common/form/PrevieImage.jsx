/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Loader from "../../Loader";

const PreviewImage = ({ file }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (typeof file === "object") {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result);
            };
        } else {
            setPreview(file);
        }
    }, [file]);

    return (
        <div className="text-center">
            {preview ? (
                <img
                    src={preview}
                    alt="preview"
                    className="rounded-circle"
                    width="150"
                    height="150"
                />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default PreviewImage;
