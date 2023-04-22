import PageMetaComponent from '@/hooks/usePageMeta'
import { useAuthStore } from '@/store/auth'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import ArtistOnboard from './artistSteps'

interface Props {
    hideLogout?: boolean
}
export default function Onboard({ hideLogout }: Props) {
    const { user, logoutAccount } = useAuthStore()
    const logoutBtnClick = async () => {
        await logoutAccount();
        window.location.href = "/";
    }
    return (
        <>
            <PageMetaComponent title='Stage seekers - Artist onboarding' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            <Box minH={'100vh'} p={5} bg={'brand.white'} display={"flex"} flexDir="column">
                <Flex pb={3} borderBottom={"1px"} borderColor={"gray.500"} justifyContent={'space-between'}>
                    <Box>
                        <Text fontSize={'2xl'} letterSpacing={'wider'} fontWeight={'bold'} textTransform={'capitalize'} color={'gray.300'}>{`${user?.accountType} onboarding`}</Text>
                        <Text color={'gray.400'}>Let's get some details</Text>
                    </Box>
                    {!hideLogout && <IconButton onClick={logoutBtnClick} borderRadius={'100%'} aria-label='logout account' title='logout account' icon={<FiLogOut />}></IconButton>}
                </Flex>

                {user?.accountType === 'artist' && <ArtistOnboard />}
            </Box >
        </>
    )
}
