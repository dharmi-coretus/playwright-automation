class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = '.product_sort_container';
    this.items = '.inventory_item_price';
    this.addToCartButtons = 'button.btn_inventory';
    this.cartIcon = '.shopping_cart_link';
  }

  async sortHighToLow() {
    await this.page.selectOption(this.sortDropdown, 'hilo');
  }

  async getPrices() {
    const prices = await this.page.$$eval(this.items, els =>
      els.map(e => parseFloat(e.textContent.replace('$', '')))
    );
    return prices;
  }

  async addTopTwoItems() {
    const buttons = await this.page.$$(this.addToCartButtons);
    await buttons[0].click();
    await buttons[1].click();
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = { InventoryPage };