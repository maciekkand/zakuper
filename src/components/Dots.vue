<template>
  <div class="flex -ml-2">
    <div class="mb-1 -mt-4 text-2xl text-blue-500">ZaKuper</div>

    <div class="w-8 h-8 ml-1 -mt-2">
      <IconNoNetworkConn
        v-if="!networkConn"
        class="w-8 h-8 ml-1 -mt-2"
      />
    </div>

    <button class="ml-2 -mt-6 text-black bg-white border-0 md:pl-14">
      <Icon
        icon="ic:round-circle"
        :class="blackDotSize"
        @click="selectShop()"
      />
    </button>

    <button class="ml-4 -mt-6 text-green-600 bg-white border-0">
      <Icon
        icon="ic:round-circle"
        :class="greenDotSize"
        @click="selectShop('bazar')"
      />
    </button>

    <button class="ml-4 -mt-6 text-red-500 bg-white border-0">
      <Icon
        icon="ic:round-circle"
        :class="redDotSize"
        @click="selectShop('biedra')"
      />
    </button>

    <button class="ml-4 -mt-6 text-blue-500 bg-white border-0">
      <Icon
        icon="ic:round-circle"
        :class="blueDotSize"
        @click="selectShop('inny')"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconNoNetworkConn from '@/assets/icons/IconNoNetworkConn.vue'
import { Icon } from '@iconify/vue'
// import { Toast } from '@capacitor/toast'
import { fetchShop } from '@/utils/api'
import { doToast } from '@/composables/useTools'

const emit = defineEmits(['showShopItems'])
const props = defineProps({
  networkConn: {
    type: Boolean,
  }
})

const greenDotSize = ref('size-9')
const redDotSize = ref('size-9')
const blueDotSize = ref('size-9')
const blackDotSize = ref('size-12')
const shop = ref('bazar')

function changeDots(shopName) {
  greenDotSize.value = 'size-9'
  redDotSize.value = 'size-9'
  blueDotSize.value = 'size-9'
  blackDotSize.value = 'size-9'

  if (shopName === 'bazar') {
    greenDotSize.value = greenDotSize.value === 'size-9' ? 'size-12' : 'size-9'
  }
  else if (shopName === 'biedra') {
    redDotSize.value = redDotSize.value === 'size-9' ? 'size-12' : 'size-9'
  }
  else if (shopName === 'inny'){
    blueDotSize.value = blueDotSize.value === 'size-9' ? 'size-12' : 'size-9'
  }
  else {
    blackDotSize.value = blackDotSize.value === 'size-9' ? 'size-12' : 'size-9'
  }
}

async function selectShop(shopName) {
  shop.value = shopName
  changeDots(shopName)
  showToast(shopName)

  try {
    const data = await fetchShop(shopName)
    const res = data.results[0].response.result.rows

    const shopItems = res.map(el => el.map(item => item.value))

    emit('showShopItems', shopItems)
  }
  catch(err) {
    console.log('Error: ', err)
  }
}

// const showToast = async (msg) => {
  //   await Toast.show({
    //     text: msg,
    //     duration: 'short',
    //     position: 'top'
    //   })
    // }

const showToast = async (msg) => {
  doToast(msg)
}
</script>
