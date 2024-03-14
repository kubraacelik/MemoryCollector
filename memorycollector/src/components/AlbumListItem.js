import React from "react";
import { CircularProgress } from "@mui/material";
import { GoTrash } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import ExpandablePanels from "./ExpandablePanels";
import PhotoList from "./PhotoList";

export default function AlbumListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  //silme işlemi zaten albumsApi'de tanımlanmıştı. Kolayca alıp burada tanımladık.
  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <button
        style={{ marginRight: "30px", border: "none", cursor: "pointer" }}
        onClick={handleClick}
      >
        {results.isLoading ? (
          <CircularProgress style={{ width: "20px", height: "20px" }} />
        ) : (
          <GoTrash />
        )}
      </button>
      <div style={{fontSize:'19px'}}>{album.title}</div>
    </>
  );

  return (
    <div>
      <ExpandablePanels header={header}>
        <PhotoList album={album} /> 
      </ExpandablePanels>
    </div>
  );
}
