'use client'
import Layout from "../layouts/default"
import { ReactElement, useEffect, useState } from 'react'
import PageMetaComponent from '@/hooks/usePageMeta'
import { useGeneralStore } from "../store/general"
import { Box, CircularProgress, Flex, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react"
import ArtistCard from "@/components/artists/ArtistCard"

const Home = function () {
  const { loadArtists, artists, progress } = useGeneralStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const reloadPage = async function () {
    setIsLoading(true);
    await loadArtists()
    setIsLoading(false)
  }
  useEffect(() => {
    reloadPage()
  }, [])
  return (
    <>
      <PageMetaComponent title='Stage Seekers - Home' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
      {isLoading && <Flex h={"400px"} w={'full'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress ml={4} isIndeterminate size={8} color='brand.highlight' />
      </Flex>}
      {artists.length > 0 && <Box>
        <Grid
          templateColumns='repeat(30, 1fr)'
          gap={2}
        >
          {artists.map((artist) => <ArtistCard key={artist.artist._id} artist={artist} />)}
        </Grid>
      </Box>}
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
