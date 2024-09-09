import { InjectionKey } from 'vue';

export const PRIMARY_COLOR: string = '#7f56d9';
// DARK MODE
export const DARK_ACTIVE_COLOR: string = '#0C111D';
export const DARK_SECONDARY_COLOR: string = '#161B26';
export const DARK_TEXT_SECONDARY_COLOR: string = '#CECFD2';
export const DARK_TEXT_TERTIARY_COLOR: string = '#94969C';
// LIGHT MODE
export const LIGHT_ACTIVE_COLOR: string = '#FFFFFF';
export const LIGHT_SECONDARY_COLOR: string = '#f5f5f5';
export const LIGHT_TEXT_SECONDARY_COLOR: string = '#667085';
export const LIGHT_TEXT_TERTIARY_COLOR: string = '#84888e';
// I18N
export const DEFAULT_LANGUAGE: string = 'en';
export const VIETNAM_LANGUAGE: string = 'vi';
// PROVIDE
export const APP_PROVIDER = {
  darkMode: Symbol() as InjectionKey<App.DarkModeProvider>,
};
