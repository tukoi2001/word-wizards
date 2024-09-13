import { setLocalStorage, getLocalStorage } from 'utils/storage';
import { Theme } from 'enums/app';
import {
  PRIMARY_COLOR,
  DARK_ACTIVE_COLOR,
  DARK_SECONDARY_COLOR,
  DARK_TEXT_SECONDARY_COLOR,
  DARK_TEXT_TERTIARY_COLOR,
  DARK_OVERLAY_COLOR,
  LIGHT_ACTIVE_COLOR,
  LIGHT_SECONDARY_COLOR,
  LIGHT_TEXT_SECONDARY_COLOR,
  LIGHT_TEXT_TERTIARY_COLOR,
  LIGHT_OVERLAY_COLOR,
} from 'config/constants';

export default function useToggleTheme() {
  const theme = ref<Theme>(Theme.LIGHT);
  const isDarkMode = ref<boolean>(false);

  onMounted(() => {
    const savedTheme = getLocalStorage<Theme>('theme');
    if (savedTheme) {
      theme.value = savedTheme;
    }
    isDarkMode.value = savedTheme === Theme.DARK ? true : false;
    setThemeColors(theme.value);
  });

  const setThemeColors = (theme: Theme): void => {
    const root = document.body;
    root.style.setProperty('--primary-color', PRIMARY_COLOR);
    if (theme === Theme.LIGHT) {
      root.style.setProperty('--active-color', LIGHT_ACTIVE_COLOR);
      root.style.setProperty('--secondary-color', LIGHT_SECONDARY_COLOR);
      root.style.setProperty('--text-primary-color', DARK_ACTIVE_COLOR);
      root.style.setProperty('--text-secondary-color', LIGHT_TEXT_SECONDARY_COLOR);
      root.style.setProperty('--text-tertiary-color', LIGHT_TEXT_TERTIARY_COLOR);
      root.style.setProperty('--overlay-color', LIGHT_OVERLAY_COLOR);
    } else {
      root.style.setProperty('--active-color', DARK_ACTIVE_COLOR);
      root.style.setProperty('--secondary-color', DARK_SECONDARY_COLOR);
      root.style.setProperty('--text-primary-color', LIGHT_ACTIVE_COLOR);
      root.style.setProperty('--text-secondary-color', DARK_TEXT_SECONDARY_COLOR);
      root.style.setProperty('--text-tertiary-color', DARK_TEXT_TERTIARY_COLOR);
      root.style.setProperty('--overlay-color', DARK_OVERLAY_COLOR);
    }
  };

  const toggleTheme = (value: boolean): void => {
    isDarkMode.value = value;
    theme.value = value ? Theme.DARK : Theme.LIGHT;
    setThemeColors(theme.value);
    setLocalStorage<Theme>('theme', theme.value);
  };

  return { isDarkMode, toggleTheme };
}
