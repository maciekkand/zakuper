import { expect, test } from '@playwright/test'
import { cartItems, cartItemsCount, nthItemClick, allItemsButtonClick, boughtItemsButtonClick, resetItemsButtonClick } from './utils/items'

const BaseUrl = 'http://localhost:5173/'
let newRandomItem

async function wait(page, delay) {
  await page.waitForTimeout(delay)
}

async function boughtItem(page) {
  const item = await nthItemClick(page, 0)
  await page.waitForTimeout(500)

  await boughtItemsButtonClick(page)
  await page.waitForTimeout(500)

  const items = await cartItems(page)
  return { item, items }
}

test.beforeEach(async ({ page }) => {
  await page.goto(BaseUrl)
  resetItemsButtonClick(page)
  await page.waitForTimeout(200)
})

test('1. Assert start number of items > 0 1.', async ({ page }) => {
  const rowsCount = await cartItemsCount(page)
  expect(rowsCount).toBeGreaterThan(0)
})

test('2. Click on the 1st item and assert than it is removed 2.', async ({ page }) => {
  const item = nthItemClick(page, 0)
  await wait(page, 200)

  const items = await cartItems(page)
  expect(items).not.toContain(item)
})

test('3. Click on the 1st item and assert that it is present on bought cart page 3.', async ({ page }) => {
  const { item, items } = await boughtItem(page)
  expect(items).toContain(item)
})

test('4. Click on the 1st item, click on the 1st item on bought page page and assert it is not present. Then click on start page and assert that it is present 4.', async ({ page }) => {
  await boughtItem(page)

  const item = await nthItemClick(page, 0)
  await wait(page, 200)

  const items = await cartItems(page)
  expect(items).not.toContain(item)

  allItemsButtonClick(page)
  await wait(page, 200)

  const startItems = await cartItems(page)
  expect(startItems).toContain(item)
})

test('5. Enter new item and assert that it shows up on the first page 5.', async ({ page }) => {
  newRandomItem = Math.random().toString()
  console.log('newRandomItem:', newRandomItem)

  await page.pause()

  await page.locator('[data-test="new-item-input-box"]').type(newRandomItem)
  await page.locator('[data-test="new-item-button"]').click()
  await wait(page, 200)

  const items = await cartItems(page)
  expect(items).toContain(newRandomItem)
})

test('6. Click on delete button of item inserted in the test above and assert that it is not present 6.', async ({ page }) => {
  const newItemCell = page
    .locator('[data-test="table-row"]')
    .filter({ has: page.locator(`text = ${newRandomItem}`) })
    .locator('[data-test="item-delete"]')

  await newItemCell.click()
  await wait(page, 500)

  const items = await cartItems(page)
  expect(items).not.toContain(newRandomItem)
})
