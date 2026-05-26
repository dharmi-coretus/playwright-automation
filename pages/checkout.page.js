class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = '#first-name';
    this.lastName = '#last-name';
    this.postalCode = '#postal-code';
    this.continueBtn = '#continue';
    this.finishBtn = '#finish';
    this.successMsg = '.complete-header';
  }

  async fillInfo() {
    await this.page.fill(this.firstName, 'Test');
    await this.page.fill(this.lastName, 'User');
    await this.page.fill(this.postalCode, '12345');
    await this.page.click(this.continueBtn);
  }

  async finishOrder() {
    await this.page.click(this.finishBtn);
  }

  async verifySuccess() {
    await this.page.waitForSelector(this.successMsg);
    const text = await this.page.textContent(this.successMsg);
    return text;
  }
}

module.exports = { CheckoutPage };