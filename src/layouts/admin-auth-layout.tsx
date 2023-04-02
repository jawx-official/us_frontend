import { Box, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import React, { ReactElement } from 'react'

function adminAuthLayout({ children }: { children: ReactElement }) {
    return (
        <div className=''>
            <Grid minH={'100vh'} p={5} bg={'brand.dark'}
                templateColumns='repeat(12, 1fr)'
                gap={4}
            >
                <GridItem display={useBreakpointValue({ base: "none", md: "none", lg: "flex" })} colSpan={useBreakpointValue({ base: 12, md: 12, lg: 4 })}>
                </GridItem>
                <GridItem display={'flex'} alignItems={'center'} colSpan={useBreakpointValue({ base: 12, md: 12, lg: 4 })} overflow={"auto"}>
                    <Box w={'100%'} className=''>{children}</Box>
                </GridItem>
                <GridItem display={useBreakpointValue({ base: "none", md: "none", lg: "flex" })} colSpan={useBreakpointValue({ base: 12, md: 12, lg: 4 })}>
                </GridItem>
            </Grid>
        </div>
    )
}

export default adminAuthLayout;
