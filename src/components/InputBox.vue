<template>
  <div class="flex -ml-2">
    <input
      class='w-[292px] h-12 p-1 mt-2 text-2xl border rounded-lg placeholder:text-slate-400 border-slate-300 focus:outline-none focusborder-sky-500 md:w-[510px]'
      placeholder='item name'
      maxlength='18'
      v-model="todoName"
      data-test="new-item-input-box"
      @keydown.enter="emit('addTodo', todoName); todoName=''"
    />

    <button
      class='h-12 w-12 pt-2 mt-2 ml-3 text-xl text-white bg-blue-500 rounded-md border-slate-300'
      data-test="new-item-button"
      @click="$emit('addTodo', todoName); todoName=''"
    >
      <div class="ml-2 md:ml-[6px] -mt-2">
        <IconBluePlusInCircle />
      </div>
    </button>
  </div>
</template>

<script setup>
defineEmits(['addTodo'])
const todoName = defineModel()
</script>
