<template>
  <div class="flex mt-5 -ml-2">
    <button
      @click='emit("showAllTodos")'
      class='p-2 pl-8 text-xl bg-green-600 rounded-md w-28 border-slate-300 md:w-[185px] md:pl-14'
      data-test="all-items-button"
    >
      <IconEmptyCart />
    </button>

    <button
      @click='emit("showBoughtTodos")'
      class='flex p-1 pl-8 ml-2 text-xl text-white bg-blue-500 rounded-md w-28 border-slate-300 md:w-[185px] md:pl-12'
      data-test="bought-items-button"
    >
      <IconFullCart />
      <span class="mt-6 ml-1">{{ boughtCount }}</span>
    </button>

    <button
      @click='emit("restartTodos")'
      class='p-2 pl-8 ml-2 text-xl bg-red-500 rounded-md w-28 border-slate-300 md:w-[185px] md:pl-14'
      data-test="reset-items-button"
    >
      <IconCrossedCart />
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['showAllTodos', 'showBoughtTodos', 'restartTodos'])

defineProps({
  boughtCount: {
    type: Number,
    default: 0
  }
})
</script>
