import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { JupiterProvider } from '@jup-ag/react-hook'
import { Connection } from '@solana/web3.js'

declare let module: any

const connection = new Connection('https://solana-api.projectserum.com')

ReactDOM.render(
  <React.StrictMode>
    <JupiterProvider connection={connection} cluster={'mainnet-beta'}>
      <App />
    </JupiterProvider>
  </React.StrictMode>,

  document.getElementById('root')
)
if (module.hot) {
  module.hot.accept()
}
