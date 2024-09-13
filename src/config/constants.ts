export const PRIMARY_COLOR: string = '#7f56d9';
// DARK MODE
export const DARK_ACTIVE_COLOR: string = '#0C111D';
export const DARK_SECONDARY_COLOR: string = '#161B26';
export const DARK_TEXT_SECONDARY_COLOR: string = '#CECFD2';
export const DARK_TEXT_TERTIARY_COLOR: string = '#94969C';
export const DARK_OVERLAY_COLOR: string = 'rgb(255 255 255 / 50%)';
// LIGHT MODE
export const LIGHT_ACTIVE_COLOR: string = '#FFFFFF';
export const LIGHT_SECONDARY_COLOR: string = '#f5f5f5';
export const LIGHT_TEXT_SECONDARY_COLOR: string = '#667085';
export const LIGHT_TEXT_TERTIARY_COLOR: string = '#84888e';
export const LIGHT_OVERLAY_COLOR: string = 'rgb(0 0 0 / 50%)';
// I18N
export const DEFAULT_LANGUAGE: string = 'en';
export const VIETNAM_LANGUAGE: string = 'vi';
// PROVIDE
export const APP_PROVIDER = {
  darkMode: Symbol() as InjectionKey<App.DarkModeProvider>,
};
// REGEX
export const REGEX: Record<'password' | 'phoneNumber', RegExp> = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phoneNumber: /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\s-]{9,15}$/,
};
