<script setup lang="ts">
import { provide } from 'vue';
import useToggleTheme from 'hooks/use-toggle-theme';
import { APP_PROVIDER } from 'config/constants';

const { isDarkMode, toggleTheme } = useToggleTheme();

provide(APP_PROVIDER.darkMode, { isDarkMode, toggleTheme });
</script>

<template>
  <router-view />
</template>
