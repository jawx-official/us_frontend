import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import UpdateAppActionTray from './updateAppActionTray'

export default function ActionTray() {
    const router = useRouter()
    return (
        <Box bg={'brand.darker'} borderRadius={8} py={10} px={6} width={"100%"}>
            {router.asPath === '/update-application' && <UpdateAppActionTray />}
        </Box>
    )
}
