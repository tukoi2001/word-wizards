<script lang="ts" setup>
import DrawingBoard from './DrawingBoard.vue';
import LoadingComponent from 'components/Loading';
</script>

<template>
  <main-layout>
    <drawing-board />

    <font-icon name="camera" color="var(--primary-color)" :size="24" />
    <loading-component />
  </main-layout>
</template>

<style scoped lang="scss"></style>
