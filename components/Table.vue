<template>
  <table class="data-table w-full">
    <thead class="text-left bg-purple-400 text-white">
      <tr>
        <slot name="header" />
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.data-table {
  tr {
    th,
    td {
      @apply px-3 py-1 border-2 border-gray-300;
    }
  }

  tbody {
    tr {
      @apply even:bg-gray-200 hover:bg-gray-300;
    }
  }
}
</style>
