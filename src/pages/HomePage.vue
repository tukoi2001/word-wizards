<template>
  <HomeContainer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeContainer from 'containers/HomeContainer/HomeContainer.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    HomeContainer,
  },
  setup(_props) {
    //
  },
});
</script>

<style lang="scss" scoped></style>
