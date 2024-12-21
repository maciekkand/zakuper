<template>
  <div class="flex mt-6">
    <div class="flex flex-col ml-[12px] md:w-[500px] md:ml-[450px]">
      <Dots
        :networkConn
        @showShopItems="showShopItems"
      />

      <InputBox
        v-model="newItem"
        @addTodo="addTodo"
      />

      <Carts
        :boughtCount
        @showAllTodos="showAllTodos"
        @showBoughtTodos="showBoughtTodos"
        @restartTodos="restartTodos"
      />

      <Table
        :todos
        :isBought
        @unhideBoughtTodo="unhideBoughtTodo"
        @hideBoughtTodo="hideBoughtTodo"
        @deleteTodo="deleteTodo"
      />

    </div>
  </div>
</template>

<script setup>
import { Network } from '@capacitor/network'

const todos = ref([])
const boughtCount = ref(0)
const isBought = ref(false)
const newItem = ref('')
const networkConn = ref(true)

async function addTodo(itemName) {
  if (!itemName) return

  let item =  itemName
  item = item.toLowerCase()
  item = item[0].toUpperCase() + item.slice(1)

  try {
    await insertTodo(item)
  }
  catch(err) {
    console.log('Error: ', err)
  }

  getTodos()
}

async function getTodos(bought) {
  todos.value = await getAllTodos(bought)
}

function showAllTodos() {
  isBought.value = false
  getTodos(false)
}

function showBoughtTodos() {
  isBought.value = true
  getTodos(true)
  getTodosBoughtQty()
}

async function getTodosBoughtQty() {
  try {
    const res  = await fetchTodosBoughtQty()
    const boughtQty = res.results[0].response.result.rows[0][0].value
    boughtCount.value = Number(boughtQty)
  }
  catch(err) {
    console.log('Error: ', err)
  }
}

async function hideBoughtTodo(index) {
  const id = (todos.value[index][0])

  try {
    await updateAsBoughtTodo(id)
  }
  catch(err) {
    console.log('Error: ', err)
  }

  getTodos(false)
  boughtCount.value = boughtCount.value + 1
}

async function unhideBoughtTodo(index) {
  const id = (todos.value[index][0])

  try {
    await updateAsNotBoughtTodo(id)
    getTodos(true)
  }
  catch(err) {
    console.log('Error: ', err)
  }

  getTodos(true)
  boughtCount.value = boughtCount.value - 1
}

async function restartTodos() {
  try {
    await resetTodos()
    boughtCount.value = 0
    isBought.value = false

    todos.value = []
    getTodos()
  }
  catch(err) {
    console.log('Erroras = ', err)
  }
}

async function deleteTodo(id) {
  try {
    await deleteItem(id)
    await getTodos(false)
  }
  catch (error) {
    console.error("Error deleting item: ", error);
  }
}

async function loadTodos() {
  console.log('loadTodos')

  try {
    await dropTable()
  }
  catch(err) {
    console.log('drop table error: ', err)
  }

  try {
    await createTable()
  }
  catch(err) {
    console.log('createTable error: ', err)
  }

  try {
    await insertAll()
  }
  catch(err) {
    console.log('insertAll error: ', err)
  }
}

function networkStatus() {
  Network.addListener('networkStatusChange', status => {
    if (status.connected) {
      networkConn.value = true
      getTodos(false)
    }
    else {
      networkConn.value = false
    }
  })
}

function showShopItems(shopItems) {
  todos.value = shopItems
}

onMounted(() => {
  // loadTodos()  // uncomment only when resetting db
  getTodos(false)
  getTodosBoughtQty()
  networkStatus()
})
</script>

