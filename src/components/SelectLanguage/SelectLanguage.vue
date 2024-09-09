<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { values } from 'lodash-es';
import { setLocalStorage, getLocalStorage } from 'utils/storage';
import { DEFAULT_LANGUAGE, VIETNAM_LANGUAGE } from 'config/constants';
import resources from 'config/resources';
import PopoverComponent from 'components/Popover';
import { onMounted } from 'vue';

const { locale, t } = useI18n();

const currentLanguage = ref<string>(DEFAULT_LANGUAGE);
const currentLocate = getLocalStorage<string>('language');
const isVisible = ref<boolean>(false);

const languageMap = computed<Record<string, App.LanguageOption>>(() => ({
  vi: {
    flag: resources.VIETNAME_FLAG,
    value: VIETNAM_LANGUAGE,
    label: t('vietnamese'),
  },
  en: {
    flag: resources.ENGLAND_FLAG,
    value: DEFAULT_LANGUAGE,
    label: t('english'),
  },
}));

const language = computed<App.LanguageOption>(() => languageMap.value[currentLanguage.value]);

onMounted(() => {
  if (currentLocate) {
    currentLanguage.value = currentLocate;
    locale.value = currentLocate;
  }
});

const changeLocale = (lang: string) => {
  currentLanguage.value = lang;
  locale.value = lang;
  setLocalStorage<string>('language', lang);
  isVisible.value = false;
};
</script>

<template>
  <div class="select-language">
    <popover-component
      v-model:visible="isVisible"
      trigger="click"
      :popperStyle="{ padding: 0 }"
      :width="100"
    >
      <template #default>
        <div class="select-language-content">
          <div
            v-for="option in values(languageMap)"
            :key="option.value"
            class="select-language-content__item"
            @click="changeLocale(option.value)"
          >
            <img class="select-language-content__flag" :src="option.flag" alt="flag" />
            <span class="select-language-content__country">{{ option.label }}</span>
          </div>
        </div>
      </template>
      <template #reference>
        <div class="select-language-trigger">
          <img class="select-language-trigger__flag" :src="language.flag" alt="flag" />
          <span class="select-language-trigger__country">{{ language.value }}</span>
        </div>
      </template>
    </popover-component>
  </div>
</template>

<style lang="scss" scoped>
.select-language {
  width: 60px;
  background: var(--secondary-color);
  padding: 8px 0;
  border-radius: 20px;
  cursor: pointer;
}

.select-language-trigger {
  @include flex-box;
  gap: 8px;

  &__flag {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &__country {
    @include style-text(13px, 600, 20px);
  }
}

.select-language-content {
  @include flex-box(center, flex-start);
  flex-direction: column;

  &__item {
    @include flex-box;
    gap: 4px;
    padding: 8px;
    cursor: pointer;
  }

  &__flag {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &__country {
    @include style-text(12px, 400, 18px);
  }
}
</style>
