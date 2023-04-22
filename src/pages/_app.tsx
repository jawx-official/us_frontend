import '@/styles/globals.css'
require('react-big-calendar/lib/css/react-big-calendar.css');
import { Roboto_Flex } from 'next/font/google'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'

const roboto = Roboto_Flex({
  weight: ["400", "500", "700"],
  variable: '--roboto-font',
  subsets: ["latin"]
})

const theme = extendTheme({
  components: {

  },
  fonts: {
    heading: roboto.style.fontFamily,
    body: roboto.style.fontFamily,
  },
  colors: {
    brand: {
      dark: "#3B82F6",
      darker: "#0F192E",
      highlight: "#FCD34D",
      blue: "#2779E2",
      shade: "#F4F7FB",
      red: "#FD6060",
      text: "#31424F",
      white: '#fff'
    },
  },

})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {
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
