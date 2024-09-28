<script lang="ts" setup>
import { RootRouter } from 'enums/app';
import { APP_PROVIDER } from 'config/constants';
import resources from 'config/resources';

type Props = {
  menuItems: App.SidebarMenu[];
};

defineProps<Props>();

const router = useRouter();
const { isDarkMode } = inject(APP_PROVIDER.darkMode)!;

const isShowDrawer = defineModel<boolean>({ required: true });

const onChangeRouter = (name: RootRouter): void => {
  router.push({ name });
  isShowDrawer.value = false;
};
</script>

<template>
  <el-drawer
    v-model="isShowDrawer"
    class="sidebar-mobile"
    direction="ltr"
    size="80%"
    append-to-body
  >
    <template #header>
      <div
        class="sidebar-mobile-header"
        @click="onChangeRouter(RootRouter.HOME_PAGE)"
      >
        <img :src="resources.APP_LOGO" alt="app-logo" />
        <div class="sidebar-mobile-header__title">Word Wizards</div>
      </div>
    </template>
    <div class="sidebar-mobile-main">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="sidebar-mobile-main-item"
      >
        <router-link
          v-if="item.to"
          :class="['sidebar-mobile-main-item__box', { 'is-dark': isDarkMode }]"
          :to="{ name: item.to }"
        >
          <font-icon :name="item.icon" :size="20" color="inherit" cursor />
          <span class="sidebar-mobile-main-item__title">{{ item.title }}</span>
        </router-link>
        <div v-else class="sidebar-mobile-main-item__box">
          <font-icon :name="item.icon" :size="20" color="inherit" cursor />
          <span class="sidebar-mobile-main-item__title">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="sidebar-mobile-footer">
        <div class="sidebar-mobile-footer__copy-right">
          &copy; Tu Xuan Front End Dev 2024
        </div>
        <a
          class="sidebar-mobile-footer__contact"
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
    </template>
  </el-drawer>
</template>

<style lang="scss">
.sidebar-mobile {
  &.el-drawer {
    --el-drawer-bg-color: var(--secondary-color);
  }

  .el-drawer {
    &__header {
      margin: 0;
    }
  }
}

.sidebar-mobile-main {
  @include flex-box(center, flex-start);
  flex-direction: column;
  gap: 12px;
}

.sidebar-mobile-main-item {
  width: 100%;

  &__box {
    @include flex-box(flex-start);
    gap: 8px;
    width: auto;
    padding: 12px;
    color: var(--text-tertiary-color);
    text-decoration: none;
    font-weight: 400;
    transition: all 0.3s ease-in-out;

    &.router-link-exact-active {
      background: $primary-light;
      border-radius: 10px;
      font-weight: 600;
      color: var(--text-primary-color);

      &.is-dark {
        background: $primary-active;
      }
    }
  }
}

.sidebar-mobile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  cursor: pointer;

  &__title {
    @include style-text(22px, 600, 32px);
    letter-spacing: 1px;
    color: var(--text-primary-color);
  }
}

.sidebar-mobile-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-top: 20px;

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

@media (max-width: 540px) {
  .sidebar-mobile-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
