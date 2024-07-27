<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeContainer',
  setup(_props) {
    //
  },
});
</script>

<template>
  <div class="home-container">
    <h1 class="home-container__title">Home Container</h1>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  background: $text-title;

  &__title {
    color: $background-white;
  }
}
</style>
