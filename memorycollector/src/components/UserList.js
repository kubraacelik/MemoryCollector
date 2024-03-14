import React from "react";
import { useFetchUsersQuery, useAddUserMutation } from "../store";
import UserListItem from "./UserListItem";
import { Skeleton, Button, CircularProgress } from "@mui/material";

//? KİŞİLERİ LİSTELEMEK İÇİN

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

  //ilk defa yükleniyorsa
  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "600px" }} />
    );
    //hata varsa
  } else if (isError) {
    content = <div style={{fontSize:'50px', textAlign:'center', fontWeight:'500' ,color:'red'}}>HATA VAR</div>;
  } 
  //hata yok ve data geliyorsa
  else {
    content = data.map((user) => {
      return <UserListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="topArrangement">
        <h1 style={{ fontSize: "40px" }}>Kişiler</h1>
        <Button variant="outlined" onClick={handleUserAdd}>
          {results.isLoading ? <CircularProgress /> : <span>Kişi Ekle+</span>}
        </Button>
      </div>
      {content}
    </div>
  );
}
