import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//? RESİMLERLE İLGİLİ İŞLEMLER İÇİN BU API KULLANILDI

// her isteğin belirli bir süre sonra yapılması için
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// reducerPath:index.js'ten ona hangi isimle ulaşacağımı belirtir

// baseQuery:nereye istek atacağımı belirtir. bu kısımda backend ile uğraşmamak için json-server kurduk.
// çalıştırmak için terminale (json-server --watch db.json) yazdık. gelen adresi baseUrl'in karşısına yazdık

// endpoints:data çekme, ekleme, kişileri kaldırma gibi işlemleri burada yaparız

// fetchFn:1 sn arayla tüm istekleri atacak
const photosApi = createApi({ 
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      // fetchAlbums: albümleri çekme işlemini yapacağız
      // builder.query: data'yı çekmek için kullanılır
      // providesTags: ben data çekme işlemi yaparken tag işlemi yapıyor.
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            // url : nereye istek atacağımı gösterir(db.json'daki ismini aldık)
            // veri çekeceğimiz  için GET metodunu kullandık
            // hangi albümün kime ait olduğunu belirtmek için params kullandık
            url: "/photos",
            method: "GET",
            params: {
              albumId: album.id,
            },
          };
        },
      }),
      // addPhoto: fotoğraf ekleme işlemini yapacağız
      // builder.mutation: data'yı update etmek için kullanılır
      // invalidatesTags:kişiye albüm ekliyoruz, (result=data'dan gelen cevap, error=hata mesajı, user=bana gelen parametre)
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
        query: (album) => {
          return {
            // veri ekleyeceğim için POST metodunu kullandık
            // kişi eklerken id ve name vardı onun body kısmında görünmesini istiyorum
            url: "/photos",
            method: "POST",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      // removeAlbum: albüm silme işlemini yapacağız
      // silme işlemi yapacağım için parametre olarak bir albüm bilgisi almam lazım
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
        query: (photo) => {
          return {
            // veri sileceğim için DELETE metodunu kullandık(silme işleminde album/id olarak yazılır)
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

//dışarıya açtık
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
