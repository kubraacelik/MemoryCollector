import React from "react";
import { CircularProgress } from "@mui/material";
import { GoTrash } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

export default function PhotoListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotoMutation();

  //silme işlemi zaten albumsApi'de tanımlanmıştı. Kolayca alıp burada tanımladık.
  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div
      style={{ margin: "20px", cursor: "pointer", position: "relative" }}
      onClick={handleRemovePhoto}
    >
      <img src={photo.url} alt="" />
      <div
        className="deleteCircularDiv"
      >
        {results.isLoading ? (
          <CircularProgress style={{ width: "30px", height: "30px" }} />
        ) : (
          <GoTrash /> 
        )}
      </div>
    </div>
  );
}
