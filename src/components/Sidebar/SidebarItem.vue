<script lang="ts" setup>
import { APP_PROVIDER } from 'config/constants';
import TooltipComponent from 'components/Tooltip';

type Props = {
  menuItems: App.SidebarMenu[];
};

defineProps<Props>();

const { isDarkMode } = inject(APP_PROVIDER.darkMode)!;
</script>

<template>
  <div class="sidebar-item">
    <tooltip-component
      v-for="(item, index) in menuItems"
      :key="index"
      :content="item.title"
      placement="right"
    >
      <router-link
        v-if="item.to"
        :class="['sidebar-item-box', { 'is-dark': isDarkMode }]"
        :to="{ name: item.to }"
      >
        <font-icon :name="item.icon" :size="20" color="inherit" cursor />
      </router-link>
      <div v-else class="sidebar-item-box">
        <font-icon :name="item.icon" :size="20" color="inherit" cursor />
      </div>
    </tooltip-component>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .sidebar-item {
    @include flex-box;
    flex-direction: column;
    gap: 24px;
  }

  .sidebar-item-box {
    @include flex-box;
    gap: 8px;
    text-decoration: none;
    width: auto;
    color: var(--text-tertiary-color);
    font-weight: 400;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--primary-color);
    }

    &.router-link-exact-active {
      position: relative;
      background: $primary-light;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      font-weight: 600;
      color: var(--text-primary-color);

      &.is-dark {
        background: $primary-active;
      }

      &:after {
        content: '';
        position: absolute;
        width: 6px;
        height: 30px;
        background-color: var(--text-primary-color);
        right: -23px;
        border-radius: 100px;
      }
    }
  }
}
</style>
