'use client'
import Layout from "../layouts/default"
import { ReactElement, useEffect, useState } from 'react'
import PageMetaComponent from '@/hooks/usePageMeta'
import { Box, CircularProgress, Flex } from "@chakra-ui/react"

const Home = function () {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const reloadPage = async function () {
    setIsLoading(true);
    setIsLoading(false)
  }
  useEffect(() => {
    reloadPage()
  }, [])
  return (
    <>
      <PageMetaComponent title='Urbanspaces - Home' description='Bringing property seekers and their dream properties together in a comprehensive marketplace' />
      {isLoading && <Flex h={"400px"} w={'full'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress ml={4} isIndeterminate size={8} color='brand.highlight' />
      </Flex>}
      <Box w={'16'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab culpa soluta saepe architecto at? Aliquam doloribus molestiae quod exercitationem? Explicabo repellat ipsa laudantium natus esse quas maiores dolorem ducimus alias.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste provident illum aut. Odit suscipit veniam harum aspernatur fugit atque, nulla cum quo molestiae veritatis iure iusto ducimus dolores, at doloribus.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti ad esse id nostrum odit expedita omnis iusto delectus assumenda unde reprehenderit mollitia quis non perspiciatis a laudantium repellat, laborum molestiae.
      </Box>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default Home;
