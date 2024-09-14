<script lang="ts" setup>
type Props = {
  currentStep: number;
  steps: App.AuthStep[];
};

defineProps<Props>();
</script>

<template>
  <div class="auth-step">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="['auth-step-item', { 'is-disabled': currentStep < index }]"
      @click="step.action"
    >
      <div
        :class="[
          'auth-step-item__icon',
          { 'is-active': currentStep === index },
        ]"
      >
        <font-icon
          :name="step.icon"
          :color="
            currentStep === index ? '#602ecc' : 'var(--text-tertiary-color)'
          "
          :size="24"
        />
      </div>
      <div
        :class="[
          'auth-step-item__content',
          { 'is-active': currentStep === index },
        ]"
      >
        <div class="auth-step-item__title">{{ step.title }}</div>
        <div class="auth-step-item__description">{{ step.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-step {
  @include flex-box(center, flex-start);
  flex-direction: column;
  gap: 45px;
}

.auth-step-item {
  @include flex-box(flex-start);
  gap: 12px;
  cursor: pointer;

  &.is-disabled {
    pointer-events: none;
  }

  &__icon {
    @include flex-box;
    flex-shrink: 0;
    position: relative;
    width: 48px;
    height: 48px;
    border: 1px solid var(--secondary-color);
    box-shadow: 0 0 2px 0 var(--text-tertiary-color);
    background: var(--active-color);
    border-radius: 8px;

    &.is-active {
      border-color: $primary-hover;
      box-shadow: 0 0 2px 0 $primary-hover;
    }
  }

  &__title {
    @include style-text(15px, 600);
    color: var(--text-secondary-color);
  }

  &__description {
    @include style-text(14px);
    color: var(--text-tertiary-color);
  }

  &__content {
    &.is-active {
      .auth-step-item {
        &__title {
          color: $primary-hover;
        }

        &__description {
          color: $primary-hover;
        }
      }
    }
  }

  &:not(:first-of-type) {
    .auth-step-item {
      &__icon {
        &:before {
          content: '';
          position: absolute;
          top: -42px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 37px;
          background-color: var(--text-tertiary-color);
          border-radius: 100px;
          opacity: 0.2;
        }
      }
    }
  }
}
</style>
