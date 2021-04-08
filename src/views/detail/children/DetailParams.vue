<template>
  <div class="params-info" v-if="Object.keys(paramInfo).length">
    <table
      class="params-info__size"
      v-for="table of paramInfo.sizes"
      :key="table"
    >
      <tr v-for="tr of table" :key="tr">
        <td v-for="td of tr" :key="td">{{ td }}</td>
      </tr>
    </table>
    <table class="params-info__param">
      <tr v-for="info in paramInfo.infos" :key="info">
        <td class="params-info__param__key">{{ info.key }}</td>
        <td class="params-info__param__value">{{ info.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DetailParams',
  props: {
    paramInfo: Object,
  },
});
</script>

<style scoped lang="scss">
.params-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
  table {
    width: 100%;
    border-collapse: collapse;
    color: $content-fontColor;
    tr {
      height: 42px;
      td {
        border-bottom: 1px solid rgba(100, 100, 100, 0.1);
      }
      td:first-child {
        color: $base-fontColor;
        width: 95px;
      }
    }
  }
  &__param {
    &__value {
      color: $base-color;
    }
  }
}
</style>
