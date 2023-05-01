import HomeFooter from "@/components/footers/homeFooter"
import MainNavigation from "@/components/navigations/mainNavigation"
import { Box } from "@chakra-ui/react"
import React from "react"

interface Props {
    children: React.ReactElement
}
export default function DefaultLayout({ children }: Props) {
    return <>
        <Box bg={'#131B23'}>
            <MainNavigation />
        </Box>
        <Box minH={'80vh'}>
            {children}
        </Box>
        <HomeFooter />
    </>
}
