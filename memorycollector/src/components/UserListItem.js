import React from "react";
import ExpandablePanels from "./ExpandablePanels";
import AlbumList from "./AlbumList";
import { GoTrash } from "react-icons/go";
import { useRemoveUserMutation } from "../store/apis/usersApi";
import { CircularProgress } from "@mui/material";

export default function UserListItem({ user }) {
  const [removeUser, results] = useRemoveUserMutation();

  //silme işlemi zaten usersApi'de tanımlanmıştı. Kolayca alıp burada tanımladık.
  const handleClick = () => {
    removeUser(user);
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
      <div style={{fontSize:'22px'}}>{user.name}</div>
    </>
  );

  return (
    <div>
      <ExpandablePanels header={header}>
        <AlbumList user={user} />
      </ExpandablePanels>
    </div>
  );
}
