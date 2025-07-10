import axios from "./httpRequester";

// 경로가 동일하다면 아예 변수를 만들어 거기에 담는다
// 나중에 수정하기에도 용이함
const path = "/cart";

export const addItem = (itemId) => {
  return axios.post(path, { itemId }).catch((e) => e.response);
};

// 반복적으로 사용되는 것을 '보일러 플레이트' 라고 한다
export const getItems = () => {
  return axios.get(path).catch((e) => e.response);
};

export const removeItem = (cartId) => {
  return axios.delete(`${path}/${cartId}`).catch((e) => e.response);
};

export const removeCart = () => {
  return axios.delete(path).catch((e) => e.response);
};
