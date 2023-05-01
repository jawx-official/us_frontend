import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface FormTabInterface {
    title: string;
    label: string;
}

const FormTabs: FormTabInterface[] = [
    {
        title: "Local rentals at your fingertips",
        label: "Rent",
    },
    {
        title: "Tour with a Urbanspaces agent.",
        label: "Buy",
    },
    {
        title: "1% listing fee when you buy + sell",
        label: "Sell",
    },
    {
        title: "Find local sublets fast & cheap",
        label: "Roommate",
    }
]

export default function Hero() {

    const [currentTab, setCurrentTab] = useState(0)

    return (
        <Box bg={'brand.primary'} h={'350px'} display={'flex'} alignItems={'center'} w={'100vw'}>
            <Box h={'300px'} w={{ base: '100vw', md: '60vw', lg: '50vw' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>

                <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>

                    <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'start'}>

                        <Box w={"350px"}>
                            <Text color={'white'} fontSize={'3xl'} fontWeight={'extrabold'}>{FormTabs[currentTab].title}</Text>
                            <Flex mt={2} gap={'10'}>
                                {FormTabs.map((tab, i) => (<Box cursor={'pointer'} onClick={() => setCurrentTab(i)} pb={'1'} borderBottom={currentTab === i ? '2px' : 'none'} key={i} fontWeight={currentTab === i ? "semibold" : "medium"} color={'gray.200'}>{tab.label}</Box>))}
                            </Flex>
                        </Box>
                        <Box py={'5'} w={"500px"}>
                            <InputGroup size='md'>
                                <Input rounded={'none'} color={'gray.200'}
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
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}
