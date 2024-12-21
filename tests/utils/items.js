const SELECTORS = {
  item_name: '[data-test="item-name"]',
  all_items_button: '[data-test="all-items-button"]',
  bought_items_button: '[data-test="bought-items-button"]',
  reset_items_button: '[data-test="reset-items-button"]',
}

export async function allItemsButtonClick(page) {
  await page.locator(SELECTORS.all_items_button).click()
}

export async function boughtItemsButtonClick(page) {
  await page.locator(SELECTORS.bought_items_button).click()
}

export async function resetItemsButtonClick(page) {
  await page.locator(SELECTORS.reset_items_button).click()
}

export async function nthItemClick(page, nth) {
  const item = await page.locator(SELECTORS.item_name).nth(nth)
  item.click()

  return item.textContent()
}

export function cartItems(page) {
  return page.locator(SELECTORS.item_name).allTextContents()
}

export async function cartItemsCount(page) {
  return page.locator(SELECTORS.item_name).count()
}
