import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'

export default function LocationSearch() {
    return (
        <Box py={'5'} w={"500px"}>
            <InputGroup size='md'>
                <Input rounded={'none'} borderColor={'gray.500'} color={'gray.200'}
                    pr='100px'
                    placeholder='City, address, school, postcode'
                />
                <InputRightElement width='90px'>
                    <Button rounded={'none'} rightIcon={<ArrowForwardIcon />} h='1.75rem' size='sm'>
                        Next
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}
