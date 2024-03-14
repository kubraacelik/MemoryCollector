import React from "react";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import { Skeleton,Button, CircularProgress } from "@mui/material";
import AlbumListItem from "./AlbumListItem";

export default function AlbumList({ user }) {
  // veri çekme işlemi yapıyoruz
  const { data, isError, isFetching } = useFetchAlbumsQuery(user);

  // addAlbum:eklemeyi sağlayacak fonksiyon, results:ne eklendi ve yüklendi mi mesajları dönecek
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAlbumAdd = () => {
    addAlbum(user);
  };

  // content benim sayfamdaki görüntü
  let content;

  //ilk defa yükleniyorsa
  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px" }} />
    );
    //hata varsa
  } else if (isError) {
    content = <div style={{fontSize:'50px', textAlign:'center', fontWeight:'500' ,color:'red'}}>HATA VAR</div>;
  } 
  //hata yok ve data geliyorsa
  else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }


  return (
    <>
      <div>
        <div className="topArrangement">
          <h3>{user.name} Albümü</h3>
          <Button variant="outlined" onClick={handleAlbumAdd}>
            {results.isLoading ? (
              <CircularProgress />
            ) : (
              <span>Albüm Ekle+</span>
            )}
          </Button>
        </div>
      </div>
      <div>{content}</div>
    </>
  );
}
