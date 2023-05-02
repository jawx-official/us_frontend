import React, { ReactElement } from 'react'
import OfferingImage from "/public/1.jpg"
import LuxuryOffering from './LuxuryOffering';
import { Box, Flex, Image } from '@chakra-ui/react';
import FindRental from './FindRental';
import SellDiaspora from './SellDiaspora';
import TalkToAgentForm from '../forms/TalkToAgentForm';
import TalkToAgent from './TalkToAgent';

interface OfferingsListItem {
    image: string | ReactElement;
    content: ReactElement
}

const offerings: OfferingsListItem[] = [
    {
        image: OfferingImage.src,
        content: <LuxuryOffering />
    },
    {
        image: OfferingImage.src,
        content: <SellDiaspora />
    },
    {
        image: OfferingImage.src,
        content: <FindRental />
    },
    {
        image: <TalkToAgentForm />,
        content: <TalkToAgent />
    }
]

export default function Offerings() {
    return (
        <Flex justifyContent={'center'}>
            <Flex maxW={"1440px"} flexDir={'column'}>
                {
                    offerings.map((item, i) => <Flex bg={typeof item.image === "string" ? "white" : "#f5f5f5"} py={'10'} px={'16'} key={i} flexDir={{ base: "column", md: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                        <Box px={'5'} w={{ base: "full", md: "50%" }}>
                            {typeof item.image === "string" ? <Image src={item.image} h="350px" /> : item.image}
                        </Box>

                        <Box px={'5'} justifyContent={'center'} alignContent={'center'} display={'flex'} w={{ base: "full", md: "50%" }}>
                            {item.content}
                        </Box>

                    </Flex>)
                }
            </Flex>
        </Flex>
    )
}
