<script setup>
import { getItems, removeItem, removeCart } from "@/services/cartService";
import { onMounted, reactive } from "vue";

// 반응형 상태
const state = reactive({
  items: [],
});

// 장바구니 상품 조회
const load = async () => {
  const res = await getItems();
  if (res === undefined || res.status !== 200) {
    return;
  }
  state.items = res.data;
};

// 장바구니 상품 삭제
const remove = async (cartId) => {
  if (!confirm("삭제하시겠습니까?")) {
    return;
  }

  const res = await removeItem(cartId);
  if (res === undefined || res.status !== 200) {
    return;
  }

  // 삭제 후
  // 1. 다시 리로딩
  // or
  // 2. 방금 삭제한 객체만 state.items에서 삭제한다.

  // 1.
  //load();

  // 2.
  if (res.data === 1) {
    const deleteIdx = state.items.findIndex((item) => item.id === cartId);
    if (deleteIdx >= 0) {
      state.items.splice(deleteIdx, 1);
    }
  }
};

const clear = async () => {
  if (!confirm("장바구니를 비우시겠습니까?")) {
    return;
  }

  const res = await removeCart();
  if (res === undefined || res.status !== 200) {
    return;
  }

  state.items = [];
};

onMounted(() => {
  load();
});
</script>

<template>
  <div class="cart">
    <div class="container">
      <template v-if="state.items.length">
        <ul class="items">
          <li v-for="i in state.items">
            <img
              :alt="`상품 사진(${i.name})`"
              :src="`/pic/item/${i.imgPath}`"
            />
            <b class="name">{{ i.name }}</b>
            <span class="price">
              {{
                (i.price - (i.price * i.discountPer) / 100).toLocaleString()
              }}원
            </span>
            <span class="remove float-end" @click="remove(i.id)" title="삭제"
              >&times;</span
            >
          </li>
        </ul>
        <div class="act d-flex justify-content-around">
          <button @click="clear" class="btn btn-danger">장바구니 비우기</button>
          <router-link to="/order" class="btn btn-primary"
            >주문하기</router-link
          >
        </div>
      </template>
      <div class="text-center py-5" v-else>장바구니가 비었습니다.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  .items {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      border: 1px solid #eee;
      margin-top: 25px;
      margin-bottom: 25px;
    }

    img {
      width: 150px;
      height: 150px;
    }

    .name {
      margin-left: 25px;
    }

    .price {
      margin-left: 25px;
    }

    .remove {
      cursor: pointer;
      font-size: 30px;
      padding: 5px 15px;
    }
  }

  .act .btn {
    width: 300px;
    display: block;
    padding: 30px 50px;
    font-size: 20px;
  }
}
</style>
