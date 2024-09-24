<script setup lang="ts">
interface SelectLocaleEmits {
  (e: 'onChangeLang', lang: string): void;
}

const langs = ['ko', 'en', 'ja'];
const emits = defineEmits<SelectLocaleEmits>();

const onChangeLang = (lang: string) => {
  emits('onChangeLang', lang);
};
</script>

<template>
  <div class="lang_btn" v-for="lang in langs">
    <button @click="onChangeLang(lang)">{{ lang }}</button>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.lang_btn {
  @apply z-[3] relative bg-white w-[5rem];
}
</style>
