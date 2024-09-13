<script lang="ts" setup>
import { APP_PROVIDER } from 'config/constants';
import SwitchComponent from 'components/Switch';

const { isDarkMode, toggleTheme } = inject(APP_PROVIDER.darkMode)!;
</script>

<template>
  <switch-component v-model="isDarkMode" size="default" :onChange="toggleTheme">
    <template #activeAction>
      <font-icon name="dark-mode" />
    </template>
    <template #inactiveAction>
      <font-icon name="light-mode" />
    </template>
  </switch-component>
</template>
