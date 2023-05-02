import HomeFooter from "@/components/footers/homeFooter"
import MainNavigation from "@/components/navigations/mainNavigation"
import { Box, Flex } from "@chakra-ui/react"
import React from "react"

interface Props {
    children: React.ReactElement
}
export default function DefaultLayout({ children }: Props) {
    return <>
        <Box bg={'brand.primary'}>
            <MainNavigation />
        </Box>
        <Box minH={'80vh'}>
            {children}
        </Box>
        <HomeFooter />
    </>
}
