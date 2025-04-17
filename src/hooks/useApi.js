// frontend/hooks/useApi.js
import axios from '../api/axios';

export function useApi() {
  const get = (url) => axios.get(url).then((res) => res.data);
  const post = (url, data) => axios.post(url, data).then((res) => res.data);
  const patch = (url, data) => axios.patch(url, data).then((res) => res.data);
  const del = (url) => axios.delete(url).then((res) => res.data);

  return { get, post, patch, del };
}