# Zakuper

Web and Android app for creating shopping list with filtering, adding, deleting, changing quantity and persisting items

Requires API key from turso.tech (.env file)
## Installation

  git clone [repo]\
  cd [repo]\
  npm install

## Running

  npm run dev

For android app:\
    npm run build\
    npx cap run android

See [Capacitor Android Documentation](https://capacitorjs.com/docs/android)

  Tests:\
  npx playwright test

See [Playwright testing](https://playwright.dev/docs/running-tests)

## Stack

  Vue 3.5\
  Tailwind 3.4\
  Capacitor 6\
  Playwright 1.49\
  libsql 0.14 [Turso](https://turso.tech/)

