import axios from 'axios';

const servUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://jsonplaceholder.typicode.com'
    : 'https://jsonplaceholder.typicode.com';

export const axiosInstance = axios.create({
  baseURL: `${servUrl}`,
});

// export const axiosInstancePhotos = axios.create({
//   baseURL: `/photos`, //к https://picsum.photos/ - нет доступа, ошибка 403
//   withCredentials: true,
// });

axiosInstance.interceptors.response.use(
  (res) => {
    // console.log(`resUrl:  ${res.request.responseURL}`, res.data); //мониторинг ответа
    return res;
  },
  (error) => {
    console.log(error.response);
    return Promise.reject(error);
  },
);
