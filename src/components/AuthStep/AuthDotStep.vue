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
        {
          'is-disabled': currentStep < index,
          'is-active': currentStep === index,
        },
      ]"
      @click="step.action"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.auth-step-dot {
  @include flex-box(center, flex-start);
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  gap: 10px;
}

.auth-step-dot-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.is-disabled {
    pointer-events: none;
  }

  &.is-active {
    width: 30px;
    border-radius: 100px;
    background-color: var(--primary-color);
  }
}
</style>
