import axios from './httpRequester';

export const addItem = itemId => {
    return axios.post('/cart', { itemId}).catch(e => e.response); 
}

// 반복적으로 사용되는 것을 '보일러 플레이트' 라고 한다
export const getItems = () => {
    return axios.get('/cart').catch(e => e.response);
}

