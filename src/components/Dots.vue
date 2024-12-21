<template>
  <div class="flex -ml-2">
    <div class="mb-1 -mt-4 text-2xl text-blue-500">ZaKuper</div>

    <div class="w-8 h-8 ml-1 -mt-2">
      <IconNoNetworkConn
        v-if="!networkConn"
        class="w-8 h-8 ml-1 -mt-2"
      />
    </div>

    <button class="md:pl-14">
      <Icon
        icon="ic:round-circle"
        class="ml-2 -mt-6 text-black"
        :class="blackDotSize"
        @click="selectShop()"
      />
    </button>

    <button>
      <Icon
        icon="ic:round-circle"
        class="ml-4 -mt-6 text-green-600"
        :class="greenDotSize"
        @click="selectShop('bazar')"
      />
    </button>

    <button>
      <Icon
        icon="ic:round-circle"
        class="ml-4 -mt-6 text-red-500"
        :class="redDotSize"
        @click="selectShop('biedra')"
      />
    </button>

    <button>
      <Icon
        icon="ic:round-circle"
        class="ml-4 -mt-6 text-blue-500"
        :class="blueDotSize"
        @click="selectShop('inny')"
      />
    </button>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const emit = defineEmits(['showShopItems'])
defineProps({
  networkConn: {
    type: Boolean,
    default: false
  }
})

const greenDotSize = ref('size-9')
const redDotSize = ref('size-9')
const blueDotSize = ref('size-9')
const blackDotSize = ref('size-12')
const shop = ref('bazar')

function changeDots(shopName) {
  const dotSizeMap = {
    bazar: greenDotSize,
    biedra: redDotSize,
    inny: blueDotSize,
    all: blackDotSize
  }

  if (dotSizeMap[shopName]) {
    for (let shop in dotSizeMap) {
      shop === shopName
        ? dotSizeMap[shop].value = 'size-12'
        : dotSizeMap[shop].value = 'size-9'
    }
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

const showToast = async (msg) => {
  doToast(msg)
}
</script>
