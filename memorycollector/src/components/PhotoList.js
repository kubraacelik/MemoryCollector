import React from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import { Skeleton, Button, CircularProgress } from "@mui/material";
import PhotoListItem from "./PhotoListItem";

export default function PhotoList({ album }) {
  // veri çekme işlemi yapıyoruz
  const { data, isError, isFetching } = useFetchPhotosQuery(album);

  // addPhoto:eklemeyi sağlayacak fonksiyon, results:ne eklendi ve yüklendi mi mesajları dönecek
  const [addPhoto, results] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album);
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
    content = (
      <div
        style={{
          fontSize: "50px",
          textAlign: "center",
          fontWeight: "500",
          color: "red",
        }}
      >
        HATA VAR
      </div>
    );
  }
  //hata yok ve data geliyorsa
  else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <>
      <div>
        <div className="topArrangement">
          <h3>{album.title} Fotoğrafları</h3>
          <Button variant="outlined" onClick={handlePhotoAdd}>
            {results.isLoading ? (
              <CircularProgress />
            ) : (
              <span>Fotoğraf Ekle+</span>
            )}
          </Button>
        </div>
      </div>
      <div className="photoDiv">{content}</div>
    </>
  );
}
