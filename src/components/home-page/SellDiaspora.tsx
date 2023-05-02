import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function SellDiaspora() {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignContent={'center'}>
            <Text fontWeight={'extrabold'} fontSize={"27px"}>Sell/Rent your properties from abroad</Text>
            <Text>
                Our Premium agents have continually provided services to Nigerians abroad in renting and managing their properties and sometimes when outright sales have been required, they have delivered the best value for our clients.
            </Text>
            <Box py={'5'}>
                <Button rounded={'none'} bg={'brand.primary'} color="white" _hover={{ bg: 'brand.primary' }}>Learn more</Button>
            </Box>
        </Flex>
    )
}
