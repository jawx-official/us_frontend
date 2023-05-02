import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import LocationSearch from '../locationSearch';

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
        <Flex w={'full'} justifyContent={'center'} bg={'brand.primary'}>
            <Flex maxW={"1440px"} flexDir={'column'}>
                <Box h={'350px'}>
                    <Box h={'300px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

                        <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>

                            <Box px={'3'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>

                                <Box w={{ base: "full", md: "500px" }}>
                                    <Text color={'white'} fontSize={'3xl'} fontWeight={'extrabold'}>{FormTabs[currentTab].title}</Text>
                                    <Flex mt={2} gap={'10'}>
                                        {FormTabs.map((tab, i) => (<Box cursor={'pointer'} onClick={() => setCurrentTab(i)} pb={'1'} borderBottom={currentTab === i ? '2px' : 'none'} key={i} fontWeight={currentTab === i ? "semibold" : "medium"} color={'gray.200'}>{tab.label}</Box>))}
                                    </Flex>
                                </Box>
                                <LocationSearch />
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}
