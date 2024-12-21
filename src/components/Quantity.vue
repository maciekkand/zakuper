<template>
  <button
    @click='decreaseQuantity(props.id)'
    class="ml-2 md:ml-[142px]"
  >
    <IconMinus />
  </button>

  <QuantityInput
    v-model='model'
    @getQuantity='newQuantity(props.id)'
  />

  <button
    @click='increaseQuantity(props.id)'
    class='ml-2'
  >
    <IconPlus />
  </button>

</template>

<script setup>
const model = defineModel()
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

async function increaseQuantity(id) {
  try {
    await updateQty(id, +model.value + 1)
    model.value = +model.value + 1
  }
  catch (error) {
    console.error("Error updating quantity: ", error);
  }
}

async function decreaseQuantity(id) {
  if (model.value > 1) {
    try {
      await updateQty(id, +model.value - 1)
      model.value = +model.value - 1
    }
    catch (error) {
      console.error("Error updating quantity: ", error)
    }
  }
}

async function newQuantity(id) {
  try {
    await updateQty(id, model.value)
  }
  catch (error) {
    console.error("Error updating quantity:", error)
  }
}
</script>
