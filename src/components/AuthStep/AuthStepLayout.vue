<script lang="ts" setup>
type Props = {
  title: string;
  description: string;
  icon: string;
};

defineProps<Props>();
</script>

<template>
  <div class="auth-step-layout">
    <div class="auth-step-layout-header">
      <div class="auth-step-layout-header__icon">
        <font-icon :name="icon" color="var(--text-secondary-color)" :size="32" />
      </div>
      <div class="auth-step-layout-header__title">
        {{ title }}
      </div>
      <div class="auth-step-layout-header__description">
        {{ description }}
      </div>
    </div>
    <div class="auth-step-layout-content">
      <slot name="content"></slot>
    </div>
    <div class="auth-step-layout-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-step-layout {
  @include flex-box;
  flex-direction: column;
  gap: 24px;
}

.auth-step-layout-header {
  @include flex-box;
  flex-direction: column;

  &__icon {
    @include flex-box;
    width: 56px;
    height: 56px;
    margin-bottom: 24px;
    border-radius: 12px;
    border: 1px solid var(--text-tertiary-color);
  }

  &__title {
    @include style-text(25px, 600, 38px);
    margin-bottom: 12px;
    color: var(--text-primary-color);
  }

  &__description {
    @include style-text(14px, 400, 21px);
    color: var(--text-tertiary-color);
  }
}

.auth-step-layout-content {
  width: 100%;
}

.auth-step-layout-action {
  @include flex-box;
  width: 100%;
}

@media (max-width: 420px) {
  .auth-step-layout-header {
    &__icon {
      width: 50px;
      height: 50px;
      margin-bottom: 16px;
    }

    &__title {
      font-size: 22px;
      line-height: 33px;
      margin-bottom: 6px;
    }
  }
}
</style>
