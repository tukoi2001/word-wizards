<script lang="ts" setup>
import { RootRouter } from 'enums/app';
import resources from 'config/resources';

type Props = {
  isCollapsedMenu: boolean;
  onToggleCollapsed: () => void;
};

defineProps<Props>();
</script>

<template>
  <div
    :class="[
      'sidebar-component',
      { 'sidebar-component--collapsed': isCollapsedMenu },
    ]"
  >
    <div
      :class="[
        'sidebar-component__collapse',
        { 'sidebar-component__collapse--expand': !isCollapsedMenu },
      ]"
      @click="onToggleCollapsed"
    >
      <font-icon name="camera" :size="16" color="var(--primary-color)" cursor />
    </div>
    <router-link
      :class="[
        'sidebar-component-header',
        { 'sidebar-component-header--collapsed': isCollapsedMenu },
      ]"
      :to="{ name: RootRouter.HOME_PAGE }"
    >
      <img :src="resources.APP_LOGO" alt="app-logo" />
      <div
        :class="[
          'sidebar-component-header__title',
          { 'sidebar-component-header__title--collapsed': isCollapsedMenu },
        ]"
      >
        Word Wizards
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .sidebar-component {
    @include flex-box(flex-start);
    flex-direction: column;
    position: relative;
    height: 100%;
    transition: all 0.3s ease-in-out;

    &--collapsed {
      align-items: center;
    }

    &__collapse {
      @include flex-box;
      position: absolute;
      right: -38px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      background: $primary-light;
      border-radius: 50%;
      border: 1px solid $primary-active;
      transition: all 0.3s ease-in-out;
      z-index: 2;

      &--expand {
        transform: rotate(-180deg);
      }
    }
  }

  .sidebar-component-header {
    @include flex-box(flex-start);
    gap: 12px;
    text-decoration: none;

    &--collapsed {
      gap: 0;
    }

    &__title {
      @include style-text(18px, 600, 27px);
      width: auto;
      color: var(--text-primary-color);
      white-space: pre;
      transition: all 0.3s ease-in-out;

      &--collapsed {
        width: 0;
        opacity: 0;
      }
    }
  }
}
</style>
