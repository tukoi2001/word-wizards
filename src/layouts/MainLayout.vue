<script lang="ts" setup></script>

<template>
  <div class="main-layout">
    <header class="main-layout-header">
      <slot name="header"></slot>
    </header>
    <div class="main-layout-main">
      <aside class="main-layout-main__sidebar">
        <slot name="sidebar"></slot>
      </aside>
      <main class="main-layout-main__content">
        <slot name="default"></slot>
      </main>
    </div>
    <footer class="main-layout-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.main-layout-header {
  flex: 0 0 auto;
}

.main-layout-main {
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  gap: 24px;

  &__sidebar {
    flex: 0 1 120px;
  }

  &__content {
    flex: 1 0 auto;
    max-width: 1400px;
  }
}

.main-layout-footer {
  flex: 0 0 auto;
}
</style>
