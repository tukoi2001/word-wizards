<script lang="ts" setup>
import { useAuthStore } from 'stores/auth';
import DarkModeToggle from 'components/DarkModeToggle';
import SelectLanguage from 'components/SelectLanguage';

const { t } = useI18n();
const authStore = useAuthStore();

const fullName = computed<string>(() => {
  const { firstName, lastName } = authStore.currentUser!;
  return `${firstName} ${lastName}`;
});
</script>

<template>
  <div class="header-component">
    <div class="header-component__menu">
      <font-icon
        name="camera"
        :size="24"
        color="var(--text-primary-color)"
        cursor
      />
      <!-- TODO -->
    </div>
    <div class="header-component__welcome">
      {{ t('welcome') }}
      <span class="header-component__welcome--primary">{{ fullName }}!</span>
    </div>
    <div class="header-component__action">
      <select-language />
      <dark-mode-toggle />
    </div>
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
      @include style-text(12px, 400, 18px);
      color: var(--text-primary-color);
      flex: 1 0 auto;

      &--primary {
        @include style-text(14px, 600, 21px);
        color: var(--primary-color);
      }
    }
  }
}
</style>
