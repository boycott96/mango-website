<template>
  <div class="carousel">
    <div
      class="carousel-inner"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        class="carousel-item"
        v-for="item in number"
        :key="item"
      >
        <img
          :src="`https://wp.larkdance.cn/file/private/${item}.jpg`"
          :alt="item"
        />
      </div>
    </div>
    <button class="prev" @click="prevSlide">Prev</button>
    <button class="next" @click="nextSlide">Next</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const currentIndex = ref(0);
const number = ref(0);
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  number.value = Number(route.query.number);
});
const nextSlide = () => {
  if (currentIndex.value == number.value - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value = currentIndex.value + 1;
  }
};
const prevSlide = () => {
  if (currentIndex.value == 0) {
    currentIndex.value = number.value - 1;
  } else {
    currentIndex.value = currentIndex.value - 1;
  }
  console.log(currentIndex.value);
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}
.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}
.carousel img {
  width: 100%;
  display: block;
  object-fit: cover;
}
.prev,
.next {
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.prev {
  left: 10px;
}
.next {
  right: 10px;
}
</style>
