<script lang="ts" setup>
import HeaderComponent from 'components/Header';
import SidebarComponent from 'components/Sidebar';

const slots = useSlots();

const isCollapsedMenu = ref<boolean>(false);

const onToggleCollapsed = (): void => {
  isCollapsedMenu.value = !isCollapsedMenu.value;
};
</script>

<template>
  <div class="main-layout">
    <aside
      :class="[
        'main-layout-sidebar',
        { 'main-layout-sidebar--collapsed': isCollapsedMenu },
      ]"
    >
      <slot v-if="slots.sidebar" name="sidebar"> </slot>
      <sidebar-component
        v-else
        :is-collapsed-menu="isCollapsedMenu"
        :on-toggle-collapsed="onToggleCollapsed"
      />
    </aside>
    <div class="main-layout-main">
      <header
        :class="[
          'main-layout-main-header',
          { 'main-layout-main-header--collapsed': isCollapsedMenu },
        ]"
      >
        <slot v-if="slots.header" name="header"></slot>
        <header-component v-else />
      </header>
      <main class="main-layout-main-content">
        <el-scrollbar height="calc(100vh - 133px)">
          <slot name="default"></slot>
        </el-scrollbar>
      </main>
    </div>
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

.main-layout-sidebar {
  display: none;
}

.main-layout-main {
  flex: 1 0 auto;
}

.main-layout-main-header {
  position: fixed;
  inset: 0;
  height: 37px;
  border-bottom: 1px solid $primary-light;
  padding: 24px;
  background: var(--active-color);
}

.main-layout-main-content {
  max-width: 1400px;
  margin-top: 85px;
  padding: 24px;
  background: var(--active-color);
}

@media (min-width: 1024px) {
  .main-layout-sidebar {
    display: block;
    flex: 0 1 auto;
    width: 200px;
    padding: 24px;
    background: var(--secondary-color);
    border-right: 1px solid $primary-light;
    transition: all 0.3s ease-in-out;

    &--collapsed {
      width: 40px;
    }
  }

  .main-layout-main-header {
    left: 248px;
    border-left: 1px solid $primary-light;
    transition: all 0.3s ease-in-out;

    &--collapsed {
      left: 88px;
    }
  }
}
</style>
