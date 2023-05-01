// pages/_app.js
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({
  colors
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>

  )
}

export default MyApp;