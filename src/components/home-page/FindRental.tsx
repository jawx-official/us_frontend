import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import LocationSearch from '../locationSearch'

export default function FindRental() {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignContent={'center'}>
            <Text fontWeight={'extrabold'} fontSize={"27px"}>Find your choice rental on Urbanspaces</Text>
            <Text>
                Whether you’re searching for houses, apartments, or offices, it's easy to find a place you'll love.
            </Text>
            <Box py={'2'}>
                <LocationSearch />
            </Box>
        </Flex>
    )
}
