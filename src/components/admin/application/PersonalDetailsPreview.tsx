import { Badge, Box, Flex, Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react'


export default function PersonalDetailsPreview({ genres, bio }: { genres: string[]; bio: string }) {
    const width = useBreakpointValue({ base: 'full', md: '500px' });
    return (



        <Box>
            <Text fontWeight={'extrabold'} fontSize={'xl'}>
                Artist's Genres
            </Text>
            <Flex width={width} wrap={'wrap'} gap={2}>
                {[...genres].map((genre, index) => (<Badge key={genre} variant='solid' colorScheme='green'>
                    {genre}
                </Badge>))}
            </Flex>


            <Text mt={'5'} fontWeight={'extrabold'} fontSize={'xl'}>
                Artist's Biography
            </Text>
            <Box width={width}>
                <Text fontSize={'sm'}>
                    {bio}
                </Text>
            </Box>
        </Box>
    )
}
