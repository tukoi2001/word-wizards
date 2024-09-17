<script lang="ts" setup>
import { useAuthStore } from 'stores/auth';
import { RootRouter } from 'enums/app';
import DarkModeToggle from 'components/DarkModeToggle';
import SelectLanguage from 'components/SelectLanguage';
import { SidebarMobile } from 'components/Sidebar';

const { t } = useI18n();
const authStore = useAuthStore();

const isShowDrawer = ref<boolean>(false);

const fullName = computed<string>(() => {
  const { firstName, lastName } = authStore.currentUser!;
  return `${firstName} ${lastName}`;
});

const menuItems = computed<App.SidebarMenu[]>(() => [
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

const onOpenDrawer = (): void => {
  isShowDrawer.value = true;
};
</script>

<template>
  <div class="header-component">
    <div class="header-component__menu" @click="onOpenDrawer">
      <font-icon
        name="menu"
        :size="24"
        color="var(--text-primary-color)"
        cursor
      />
    </div>
    <div class="header-component__welcome">
      {{ t('welcome') }}
      <span class="header-component__welcome--primary">{{ fullName }}!</span>
    </div>
    <div class="header-component__action">
      <select-language />
      <dark-mode-toggle />
    </div>
    <sidebar-mobile v-model="isShowDrawer" :menu-items="menuItems" />
  </div>
</template>

<style lang="scss" scoped>
.header-component {
  @include flex-box(space-between);
  position: relative;

  &__menu {
    position: absolute;
    display: block;
  }

  &__welcome {
    @include flex-box(flex-start);
    @include style-text(12px, 400, 18px);
    flex: 1 0 auto;
    gap: 4px;
    margin-left: 40px;
    color: var(--text-primary-color);

    &--primary {
      @include style-text(14px, 600, 21px);
      color: var(--primary-color);
    }
  }

  &__action {
    @include flex-box;
    flex: 0 0 auto;
    gap: 12px;
  }
}

@media (min-width: 1024px) {
  .header-component {
    &__menu {
      display: none;
    }

    &__welcome {
      margin-left: 0;
    }
  }
}

@media (min-width: 430px) {
  .header-component {
    &__welcome {
      @include style-text(18px, 400, 27px);
      color: var(--text-primary-color);
      flex: 1 0 auto;

      &--primary {
        @include style-text(20px, 600, 30px);
        color: var(--primary-color);
      }
    }
  }
}
</style>
