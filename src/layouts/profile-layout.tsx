import DefaultNavigationBar from '@/components/navigation';
import MainFooter from '@/components/navigation/mainFooter';
import LayoutRightSide from '@/components/RightSide/LayoutRightSide';
import { useAuthStore } from '@/store/auth';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import React, { ReactElement } from 'react'

function ProfileLayout({ children }: { children: ReactElement }) {
    const { access, user } = useAuthStore()
    return (
        <>
            <DefaultNavigationBar />
            <Grid minH={'93vh'} p={5} bg={'brand.dark'}
                templateColumns='repeat(16, 1fr)'
                gap={4}
            >
                <GridItem colSpan={useBreakpointValue({ base: 16, md: 16, lg: 12, xl: 12 })} overflow={"auto"}>
                    <main className=''>{children}</main>
                </GridItem>
                <GridItem display={useBreakpointValue({ base: "none", md: "none", lg: "flex" })} colSpan={useBreakpointValue({ base: 16, md: 16, lg: 4, xl: 4 })}>
                    <LayoutRightSide defaultScreen='register' />
                </GridItem>
            </Grid>
            <MainFooter />
        </>
    )
}

export default ProfileLayout;
