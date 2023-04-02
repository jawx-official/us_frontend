import { Review } from '@/data/general.interface'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function Previews({ reviews }: { reviews: Review[] }) {
    return (
        <Box py={3}>
            <Text fontWeight={'semibold'}>Latest user reviews</Text>
            {reviews.length === 0 && <Text fontSize={'xs'}>There are no reviews for this artist yet</Text>}
        </Box>
    )
}
