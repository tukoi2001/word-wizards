<script lang="ts" setup>
import { RootRouter } from 'enums/app';
import resources from 'config/resources';
import SidebarItem from './SidebarItem.vue';

const { t } = useI18n();

const menuTopItems = computed<App.SidebarMenu[]>(() => [
  {
    icon: 'homepage',
    title: t('homepage'),
    to: RootRouter.HOME_PAGE,
  },
  {
    icon: 'user-management',
    title: t('homepage'),
    to: RootRouter.NOT_FOUND,
  },
]);

const menuBottomItems = computed<App.SidebarMenu[]>(() => [
  {
    icon: 'settings',
    title: t('account_settings'),
    to: RootRouter.NOT_FOUND,
  },
  {
    icon: 'logout',
    title: t('log_out'),
    action: () => {
      // show modal logout
    },
  },
]);
</script>

<template>
  <div class="sidebar-component">
    <router-link
      class="sidebar-component-header"
      :to="{ name: RootRouter.HOME_PAGE }"
    >
      <img :src="resources.APP_LOGO" alt="app-logo" />
    </router-link>
    <div class="sidebar-component-main">
      <div class="sidebar-component-main__top">
        <sidebar-item :menu-items="menuTopItems" />
      </div>
      <div class="sidebar-component-main__bottom">
        <sidebar-item :menu-items="menuBottomItems" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .sidebar-component {
    @include flex-box(flex-start, center);
    flex-direction: column;
    position: relative;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }

  .sidebar-component-header {
    padding: 26px 24px 25px 24px;
    border-bottom: 1px solid $primary-light;
    text-decoration: none;
  }

  .sidebar-component-main {
    @include flex-box;
    flex-direction: column;
    height: 100%;

    &__top {
      flex: 1 1 auto;
      padding: 24px 20px;
    }

    &__bottom {
      flex: 0 0 auto;
      padding: 24px 30px;
      border-top: 1px solid $primary-light;
    }
  }
}
</style>
