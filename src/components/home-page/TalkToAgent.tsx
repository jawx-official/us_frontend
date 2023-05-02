import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function TalkToAgent() {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignContent={'center'}>
            <Text fontWeight={'extrabold'} fontSize={"27px"}>Talk to Urbanspaces agents</Text>
            <Text>
                You’ll be connected with an expert local agent—there’s no pressure or obligation.
            </Text>
        </Flex>
    )
}
