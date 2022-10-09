import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const PREFIX = 'calorie-calculator-app@';

const getPrefix = (key: string) => {
  return PREFIX + key;
};

export const NAMESPACE = 'app';

type Theme = 'auto' | 'dark';

export const use = defineStore(NAMESPACE, () => {
  const theme = ref<Theme>('auto');

  watch(
    () => theme.value,
    () => {
      localStorage.setItem(getPrefix('theme'), theme.value);
      toggleThemeAttribute(theme.value !== 'auto');
    },
  );

  const changeTheme = () => {
    theme.value = theme.value === 'dark' ? 'auto' : 'dark';
  };

  const toggleThemeAttribute = (value: boolean) => {
    if (value) {
      setThemeAttribute();
    } else {
      removeThemeAttribute();
    }
  };

  const setThemeAttribute = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
  };

  const removeThemeAttribute = () => {
    document.documentElement.removeAttribute('data-theme');
  };

  onMounted(() => {
    theme.value = (localStorage.getItem(getPrefix('theme')) as Theme) || 'auto';
    toggleThemeAttribute(window?.matchMedia?.('(prefers-color-scheme: dark)').matches);
  });

  return {
    theme,
    changeTheme,
  };
});
