<script lang="ts" setup>
import { RootRouter } from 'enums/app';
import resources from 'config/resources';
import DarkModeToggle from 'components/DarkModeToggle';
import SelectLanguage from 'components/SelectLanguage';

const slots = useSlots();
</script>

<template>
  <div class="auth-layout">
    <aside v-if="slots.sidebar" class="auth-layout-sidebar">
      <router-link
        class="auth-layout-sidebar__header"
        :to="{ name: RootRouter.HOME_PAGE }"
      >
        <img :src="resources.APP_LOGO" alt="app-logo" />
        <div class="auth-layout-sidebar__title">Word Wizards</div>
      </router-link>
      <el-scrollbar height="calc(100vh - 132px)">
        <div class="auth-layout-sidebar__main">
          <slot name="sidebar"></slot>
        </div>
      </el-scrollbar>
      <div class="auth-layout-sidebar__footer">
        <div class="auth-layout-sidebar__copy-right">
          &copy; Tu Xuan Front End Dev 2024
        </div>
        <a
          class="auth-layout-sidebar__contact"
          href="mailto:tutx.it610@gmail.com"
        >
          <font-icon
            name="email"
            :size="14"
            color="var(--text-tertiary-color)"
          />
          tutx.it610@gmail.com
        </a>
      </div>
    </aside>
    <main class="auth-layout-content">
      <div class="auth-layout-content__header">
        <div class="auth-layout-content__logo">
          <router-link :to="{ name: RootRouter.HOME_PAGE }">
            <img :src="resources.APP_LOGO" alt="app-logo" />
          </router-link>
        </div>
        <div class="auth-layout-content__option">
          <select-language />
          <dark-mode-toggle />
        </div>
      </div>
      <div class="auth-layout-content__main">
        <el-scrollbar height="calc(100vh - 88px)">
          <slot name="default"></slot>
        </el-scrollbar>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.auth-layout-sidebar {
  display: none;
}

.auth-layout-content {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  background: var(--active-color);

  &__header {
    @include flex-box(space-between);
    gap: 12px;
    flex: 0 1 40px;
    padding: 24px;
  }

  &__logo {
    display: block;
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  &__option {
    @include flex-box;
    gap: 12px;
  }

  &__main {
    flex: 1 0 auto;
    position: relative;
  }
}

@media (min-width: 1024px) {
  .auth-layout-sidebar {
    display: flex;
    flex: 0 0 440px;
    flex-direction: column;
    padding: 32px;
    background: var(--secondary-color);

    &__header {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      padding-bottom: 20px;
    }

    &__title {
      font-size: 22px;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 1px;
      color: var(--text-primary-color);
    }

    &__main {
      padding: 40px 1px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
    }

    &__copy-right,
    &__contact {
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      color: var(--text-tertiary-color);
    }

    &__contact {
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
  }

  .auth-layout-content {
    &__header {
      justify-content: flex-end;
    }

    &__logo {
      display: none;
    }
  }
}
</style>
