# Playwright Automation Framework

## 📌 Setup Instructions

### Install dependencies
npm install

### Install Playwright browsers
npx playwright install

---

## ▶ Run Tests

npx playwright test

Run in UI mode:
npx playwright test --ui

Run headed:
npx playwright test --headed

---

## 📊 View Report

npx playwright show-report

---

## ⚙️ Environment Setup

Create .env file:

BASE_URL=https://dummyjson.com
DUMMY_USERNAME=emilys
DUMMY_PASSWORD=emilyspass

---

## 🚀 CI/CD

Tests run automatically using pipeline:
- GitHub Actions OR GitLab CI
