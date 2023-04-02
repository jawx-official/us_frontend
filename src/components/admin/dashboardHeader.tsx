import { ReactNode } from 'react';
import {
    Box,
    Flex,
    useColorModeValue,
    Stack,
    IconButton,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '@/store/auth';


export default function DashboardNav() {
    const { logoutAccount } = useAuthStore()
    const logoutBtnClick = async () => {
        await logoutAccount();
        window.location.href = "/";
    }
    return (
        <>
            <Box bg={'white'} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box></Box>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <IconButton onClick={logoutBtnClick} borderRadius={'100%'} aria-label='logout account' title='logout account' icon={<FiLogOut />}></IconButton>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}