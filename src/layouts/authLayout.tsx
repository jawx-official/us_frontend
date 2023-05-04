import HomeFooter from "@/components/footers/homeFooter"
import MainNavigation from "@/components/navigations/mainNavigation"
import { Box, Flex } from "@chakra-ui/react"
import React from "react"

interface Props {
    children: React.ReactElement
}
export default function AuthLayout({ children }: Props) {
    return <>
        <Box bg={'brand.primary'}>
            <MainNavigation />
        </Box>
        <Box bg={'brand.primary'} h={'94vh'} w={'full'} display={"flex"} justifyContent={'center'} gap={"0"}>
            <Box w={{ base: "full", md: '50%' }} justifyContent={'center'} display={'flex'} h={'full'}>
                <Flex w={{ base: 'full', lg: '70%' }} h={'full'} px={'10'} align={'center'}>
                    <Box p={'10'} shadow={'lg'} rounded={'lg'} minH={'30vh'} bg={'white'} w={'full'}>
                        {children}
                    </Box>
                </Flex>

            </Box>
        </Box>
        {/* <HomeFooter /> */}
    </>
}
