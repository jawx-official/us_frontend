import { ArtistInfo } from '@/data/general.interface'
import { GridItem, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import ArtistInfoCard from './ArtistInfo'
import GalleryCarouselMini from './GalleryCarouselMini'

export default function ArtistCard({ artist }: { artist: ArtistInfo }) {
    const span = useBreakpointValue({ base: 30, md: 15 })
    return (
        <GridItem border={'1px'}
            rounded={'md'}
            borderColor={'gray.400'} display={"block"} colSpan={span}>
            <GalleryCarouselMini cards={artist.portfolio.gallery.map(e => e.url)} />
            <ArtistInfoCard averageRating={artist.averageRating} latestReviews={artist.latestReviews} artist={artist.artist} />
        </GridItem>
    )
}
