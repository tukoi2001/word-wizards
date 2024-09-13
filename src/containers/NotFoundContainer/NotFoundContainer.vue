<script lang="ts" setup>
import { RootRouter } from 'enums/app';
import resources from 'config/resources';
import DarkModeToggle from 'components/DarkModeToggle';
import SelectLanguage from 'components/SelectLanguage';
import ButtonComponent from 'components/Button/Button.vue';

const { t } = useI18n();
const router = useRouter();

const onGoBack = (): void => {
  router.back();
};

const onGoHome = (): void => {
  router.push({ name: RootRouter.HOME_PAGE });
};
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-container-header">
      <router-link class="not-found-container-header__link" :to="{ name: RootRouter.HOME_PAGE }">
        <img :src="resources.APP_LOGO" alt="app-logo" />
        <span>Word Wizards</span>
      </router-link>
      <div class="not-found-container-header__right">
        <select-language />
        <dark-mode-toggle />
      </div>
    </div>
    <div class="not-found-container-main">
      <div class="not-found-container-main__status">
        {{ t('not_found') }}
      </div>
      <div class="not-found-container-main__title">
        {{ t('page_not_found') }}
      </div>
      <div class="not-found-container-main__description">
        {{ t('page_not_found_description') }}
      </div>
      <div class="not-found-container-main__action">
        <button-component type="default" size="default" :onClick="onGoBack">
          {{ t('go_back') }}
        </button-component>
        <button-component size="default" :onClick="onGoHome">
          {{ t('take_me_home') }}
        </button-component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found-container {
  width: 100vw;
  height: 100vh;
  background-color: var(--active-color);
}

.not-found-container-header {
  @include flex-box(space-between);
  padding: 24px;

  &__link {
    @include flex-box(flex-start);
    @include style-text(18px, 600, 35px);
    flex: 1 1 auto;
    gap: 8px;
    color: var(--text-primary-color);
    text-decoration: none;
  }

  &__right {
    @include flex-box;
    flex: 0 0 auto;
    gap: 12px;
  }
}

.not-found-container-main {
  @include flex-box;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  padding: 24px;
  text-align: center;

  &__status {
    @include style-text(12px, 400, 18px);
    position: relative;
    padding: 5px 10px 5px 20px;
    border-radius: 12px;
    border: 1px solid var(--text-secondary-color);
    background-color: var(--secondary-color);
    color: var(--text-secondary-color);

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--primary-color);
    }
  }

  &__title {
    @include style-text(40px, 600, 60px);
    color: var(--text-primary-color);
  }

  &__description {
    @include style-text(14px, 300, 21px);
    color: var(--text-secondary-color);
    text-align: center;
  }
}

@media (min-width: 420px) {
  .not-found-container-header {
    &__link {
      font-size: 20px;
    }
  }
}
</style>
