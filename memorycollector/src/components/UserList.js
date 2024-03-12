import React from "react";
import { useFetchUsersQuery, useAddUserMutation } from "../store";
import UserListItem from "./UserListItem";
import { Skeleton, Button, CircularProgress } from "@mui/material";

export default function UserList() {
  // veri çekme işlemi yapıyoruz
  const { data, isError, isFetching } = useFetchUsersQuery();

  // addUser:eklemeyi sağlayacak fonksiyon, results:ne eklendi ve yüklendi mi mesajları dönecek
  const [addUser, results] = useAddUserMutation();

  const handleUserAdd = () => {
    addUser();
  };

  // content benim sayfamdaki görüntü
  let content;

  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "600px" }} />
    );
  } else if (isError) {
    content = <div>Hata Var</div>;
  } else {
    content = data.map((user) => {
      return <UserListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="topArrangement">
        <h1 style={{ fontSize: "25px" }}>Kişiler</h1>
        <Button variant="outlined" onClick={handleUserAdd}>
          {results.isLoading ? <CircularProgress /> : <span>Kişi Ekle+</span>}
        </Button>
      </div>
      {content}
    </div>
  );
}
