//? tüm api'lerin implemente edildiği kısım

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";

export const store = configureStore({
  // reducer'lere path ile ulaşıyorum
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  //   birleştirme işlemi yapıyoruz
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

// ekleme, silme ve çekme işlemlerini dışarıya açtım
export {
  useAddUserMutation,
  useFetchUsersQuery,
  useRemoveUserMutation,
} from "./apis/usersApi";
