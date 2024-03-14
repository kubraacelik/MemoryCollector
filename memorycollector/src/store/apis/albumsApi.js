import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//? ALBÜMLERLE İLGİLİ İŞLEMLER İÇİN BU API KULLANILDI

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
const albumsApi = createApi({ 
  reducerPath: "albums",
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
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbum", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            // url : nereye istek atacağımı gösterir(db.json'daki ismini aldık)
            // veri çekeceğimiz  için GET metodunu kullandık
            // hangi albümün kime ait olduğunu belirtmek için params kullandık
            url: "/albums",
            method: "GET",
            params: {
              userId: user.id,
            },
          };
        },
      }),
      // addAlbum: albüm ekleme işlemini yapacağız
      // builder.mutation: data'yı update etmek için kullanılır
      // invalidatesTags:kişiye albüm ekliyoruz, (result=data'dan gelen cevap, error=hata mesajı, user=bana gelen parametre)
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbum", id: user.id }];
        },
        query: (user) => {
          return {
            // veri ekleyeceğim için POST metodunu kullandık
            // kişi eklerken id ve name vardı onun body kısmında görünmesini istiyorum
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      // removeAlbum: albüm silme işlemini yapacağız
      // silme işlemi yapacağım için parametre olarak bir albüm bilgisi almam lazım
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            // veri sileceğim için DELETE metodunu kullandık(silme işleminde album/id olarak yazılır)
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

//dışarıya açtık
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
