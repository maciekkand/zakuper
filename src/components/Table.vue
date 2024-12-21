<template>
  <table class="mt-2 text-2xl cursor-pointer -ml-3">
    <tr
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="h-12"
      data-test="table-row"
    >
      <td
        class="qw-[200px] md:w-[302px]"
        @click="
          isBought
            ? emit('unhideBoughtTodo', index)
            : emit('hideBoughtTodo', index)
      ">
        <span>{{ index + 1 }}.</span>

        <span
          v-if="!isBought"
          data-test="item-name"
        >{{ todo[1] }}</span>

        <span
          v-if="isBought"
          data-test="item-name"
        >{{ todo[1].slice(0, 13) }}</span>

      </td>

      <td class="flex">
        <button
          v-if="!isBought"
          class="ml-6 md:ml-[220px]"
          data-test="item-delete"
          @click="deleteItem(todo[0])"
        >
          <IconDelete />
        </button>

        <Quantity
          v-if="isBought"
          v-model="todo[2]"
          :id="todo[0]"
        />
      </td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  todos: {
    type: Object,
    default: () => {}
  },
  isBought: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['unhideBoughtTodo', 'hideBoughtTodo', 'deleteTodo'])

function deleteItem(id) {
  emit('deleteTodo', id)
}
</script>
