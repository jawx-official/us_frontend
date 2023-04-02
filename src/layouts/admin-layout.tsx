import DashboardNav from '@/components/admin/dashboardHeader'
import SimpleSidebar from '@/components/admin/sidebar'
import useAlertListener from '@/hooks/useAlertListener';
import { useAuthStore } from '@/store/auth';
import { Box, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export default function adminLayout({ children }: { children: ReactElement }) {
    const { error, message } = useAuthStore()
    useAlertListener(useAuthStore, {
        pos: "bottom",
        message: error || message,
        status: error ? 'error' : 'success',
    });
    return (
        <>
            <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            <Grid minH={'100vh'} bg={'white'}
                templateColumns='repeat(12, 1fr)'
            >
                <GridItem display={useBreakpointValue({ base: "none", md: "none", lg: "none", xl: "flex" })} colSpan={2}>
                    <SimpleSidebar />
                </GridItem>
                <GridItem colSpan={useBreakpointValue({ base: 12, md: 12, lg: 10, xl: 10 })} overflow={"auto"}>
                    <DashboardNav />
                    <Box p={'2'} className=''>{children}</Box>
                </GridItem>
            </Grid>
        </>
    )
}
