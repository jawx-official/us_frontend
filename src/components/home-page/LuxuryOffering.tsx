import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function LuxuryOffering() {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignContent={'center'}>
            <Text fontWeight={'extrabold'} fontSize={"27px"}>Proven expertise for luxury homes</Text>
            <Text>
                Our Premium agents have extensive experience buying and selling high-end homes, ranking them in the top 1% of agents working in luxury real estate.
            </Text>
            <Box py={'5'}>
                <Button rounded={'none'} bg={'brand.primary'} color="white" _hover={{ bg: 'brand.primary' }}>Learn more</Button>
            </Box>
        </Flex>
    )
}
