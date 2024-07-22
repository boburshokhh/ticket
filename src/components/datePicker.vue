<template>
  <v-date-picker v-model="range" is-range :model-config="modelConfig" :masks="masks" class="">
    <template v-slot="{ inputValue, inputEvents }">
      <div class="flex justify-center items-center">
        <input :value="inputValue.start" v-on="inputEvents.start" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300 smt-all-kpi-range-date" />
        <input :value="inputValue.end" v-on="inputEvents.end" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300 smt-all-kpi-range-date" />
      </div>
    </template>
  </v-date-picker>
</template>

<script>
export default {
  data() {
    return {
      range: { start: null, end: null },
      modelConfig: {
        type: 'date',
        mask: 'YYYY-MM-DD',
      },
      masks: {
        input: 'YYYY-MM-DD',
      },
    };
  },
};
</script>
