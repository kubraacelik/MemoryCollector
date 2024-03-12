import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// her isteğin belirli bir süre sürmesi için
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// reducerPath:index.js'ten ona hangi isimle ulaşaçağımı belirtir
// baseQuery:nereye istek atacağımı belirtir
// endpoints:data çekme, ekleme, kişileri kaldırma gibi işlemleri burada yaparız
// fetchFn:1sn arayla tüm istekleri atacak
const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      // fetchUsers: kişileri çekme işlemini yapacağız
      //  builder.query: data'yı çekmek için kullanılır
      fetchUsers: builder.query({
        providesTags: ["User"],
        query: () => {
          return {
            // url : nereye istek atacağımı gösterir(db.json'daki ismini aldık)
            // veri çekeceğim için GET metodunu kullandık
            url: "/users",
            method: "GET",
          };
        },
      }),
      // addUser: kişi ekleme işlemini yapacağız
      //  builder.mutation: data'yı update etmek için kullanılır
      addUser: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "User" }];
        },
        query: () => {
          return {
            // veri ekleyeceğim için POST metodunu kullandık
            // kişi eklerken id ve name vardı onun body kısmında görünmesini istiyorum
            url: "/users",
            method: "POST",
            body: {
              name: faker.name.fullName(),
            },
          };
        },
      }),
      // removeUser: kişi silme işlemini yapacağız
      //   silme işlemi yapacağım için parametre olarak bir user bilgisi almam lazım
      removeUser: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "User" }];
        },
        query: (user) => {
          return {
            // veri sileceğim için DELETE metodunu kullandık(silme işleminde users/id olarak yazılır)
            url: `/users/${user.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;
export { usersApi };
