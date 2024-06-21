import { AarcProvider, useAarc } from '@aarc-dev/deposit-widget'

import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import '@aarc-dev/deposit-widget/dist/style.css';
const queryClient = new QueryClient()

function App() {

  const open = useAarc();

  const handleSubmit = () => {
    open();
  };

  const config = {

    onRamp: {
      mode: "deposit",
      estimatedGasLimit: "1000000",
      sourceTokenData: {
        "sourceTokenCode": "USDC",
        "sourceTokenAmount": 100
      },
      customerId: "323232323",
      exchangeScreenTitle: "Deposit funds in your wallet",
    },
    destination: {
      chainId: 137,
      tokenAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      walletAddress: "0x7C1a357e76E0D118bB9E2aCB3Ec4789922f3e050",
      tokenSymbol: "USDA",
      tokenDecimals: 6,
    },
    appearance: {
      logoUrl: null,
      themeColor: "#800080",
    },
    options: {
      fetchOnlyDestinationBalance: true,
    },
    apiKeys: {
      aarcSDK: import.meta.env.VITE_AARC_API_KEY,
    },
    onTransactionSuccess: (data: any) => {
      console.log('onTransactionSuccess', data)
    },

    onTransactionError: (data: any) => {
      console.log('onTransactionError', data)
    },

    onWidgetClose: () => {
      console.log('onWidgetClose')
    },

    onWidgetOpen: () => {
      console.log('onWidgetOpen')
    }


  }

  return (
    <>
      <div className='flex-col' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p className='text-5xl text-red-800'>Deposit widget</p>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AarcProvider config={config} >
              <button onClick={handleSubmit}>Open</button>
            </AarcProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </div>

    </>
  )
}

export default App
