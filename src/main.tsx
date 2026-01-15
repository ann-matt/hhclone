import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'
import {Provider} from 'react-redux'
import store from './store/store.ts'


import { MantineProvider, createTheme  } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';

const brand: MantineColorsTuple = [
  '#edf2ff', // 0 – просто светлые оттенки (можно взять как у indigo)
  '#dbe4ff', // 1
  '#bac8ff', // 2
  '#91a7ff', // 3
  '#748ffc', // 4
  '#5c7cfa', // 5
  '#4263eb', // 6  <-- Primary
  '#3b5bdb', // 7
  '#364fc7', // 8  <-- Dark primary
  '#2f44ad', // 9
];

const gray: MantineColorsTuple = [
  '#F6F6F7', // 0 – фон
  '#DFDFE0', // 1 – Ultra light (10%)
  '#C8C8C9', // 2 – Pre light (20%)
  '#B1B1B2', // 3 – Light gray (30%)
  '#828284', // 4 – Gray (50%)
  '#555557', // 5
  '#3A3A3C', // 6
  '#262628', // 7
  '#171719', // 8
  '#0F0F10', // 9 – самый тёмный / Black1
];


const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  colors: {
    brand,
    gray,
  },
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 8 },
  black: '#0F0F10',
  white: '#FFFFFF',
  other: {
    background: '#F6F6F7',
  }

});



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
