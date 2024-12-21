import { fetchTodos } from '@/utils/api'
import { Toast } from '@capacitor/toast'

export async function getAllTodos(bought) {
  try {
    const data = await fetchTodos(bought)
    const res = data.results[0].response.result.rows
    const shopItems = res.map(el => el.map(item => item.value))
    const sortedShopItems = shopItems.sort((a, b) => a[1].localeCompare(b[1]))

    return sortedShopItems
  }
  catch(err) {
    console.log('Error: ', err)
  }
}

export async function doToast(msg) {
  const showToast = await Toast.show({
    text: msg,
    duration: 'short',
    position: 'top'
  })

  return showToast
}
