<script lang="ts" setup></script>

<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--overlay-color);
  z-index: 1;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;

  &:before,
  &:after {
    content: '';
    grid-area: 1/1;
    --c: no-repeat
      radial-gradient(farthest-side, var(--primary-color) 92%, transparent);
    background:
      var(--c) 50% 0,
      var(--c) 50% 100%,
      var(--c) 100% 50%,
      var(--c) 0 50%;
    background-size: 12px 12px;
    animation: spin 1s infinite;
  }

  &:before {
    margin: 4px;
    filter: hue-rotate(45deg);
    background-size: 8px 8px;
    animation-timing-function: linear;
  }
}

@keyframes spin {
  100% {
    transform: rotate(0.5turn);
  }
}
</style>
