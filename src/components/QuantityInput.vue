<template>
  <input
    class='p-1 ml-2 text-xl border rounded-md w-[45px] placeholder:italic placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-sky-500'
    maxlength='3'
    v-model='model'
    @blur='emit("getQuantity", model)'
  />
</template>

<script setup>
const model = defineModel({ required: true })
defineEmits(['getQuantity'])
</script>

