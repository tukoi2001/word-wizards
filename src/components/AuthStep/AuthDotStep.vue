<script lang="ts" setup>
type Props = {
  currentStep: number;
  steps: App.AuthStep[];
};

defineProps<Props>();
</script>

<template>
  <div class="auth-step-dot">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="[
        'auth-step-dot-item',
        { 'is-disabled': currentStep < index, 'is-active': currentStep === index },
      ]"
      @click="step.action"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.auth-step-dot {
  @include flex-box(center, flex-start);
  gap: 20px;
}

.auth-step-dot-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  cursor: pointer;

  &.is-disabled {
    pointer-events: none;
  }

  &.is-active {
    background-color: var(--primary-color);
  }
}
</style>
