import DefaultNavigationBar from '@/components/navigation';
import MainFooter from '@/components/navigation/mainFooter';
import Onboard from '@/components/onboarding';
import LayoutRightSide from '@/components/RightSide/LayoutRightSide';
import { useAuthStore } from '@/store/auth';
import { Grid, GridItem, useBreakpointValue, Text, Container } from '@chakra-ui/react';
import React, { ReactElement } from 'react'

function defaultLayout({ children }: { children: ReactElement }) {
    const { access, user } = useAuthStore()

    const renderConditionally = () => {
        if (access && access.granted && user && !user.setupComplete) {
            return <Onboard />
        } else {
            return <>
                <DefaultNavigationBar />
                <Grid minH={'93vh'} p={5} bg={'brand.white'}
                    templateColumns='repeat(12, 1fr)'
                    gap={4}
                >
                    <GridItem colSpan={useBreakpointValue({ base: 12, md: 12, lg: 12, xl: 12 })} overflow={"auto"}>
                        <main className=''>{children}</main>
                    </GridItem>
                </Grid>
                <MainFooter />
            </>
        }
    }
    return (
        <div className=''>
            {renderConditionally()}
        </div>
    )
}

export default defaultLayout;
