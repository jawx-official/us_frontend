import { Box, Button, Center, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { StepsProps } from '@/data/steps.interface'
import React, { useState } from 'react'
import users from '@/apis/users';
import { FiCheck } from 'react-icons/fi'
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/router';

export default function Finish({ disabled, prevFn, nextFn }: StepsProps) {
    const { setUser } = useAuthStore()
    const router = useRouter()
    const [progress, setProgress] = useState<boolean>(false);

    const submitStep = async function () {
        setProgress(true)
        const { data: { code, message, data } } = await users.updateMyAccount({
            setupComplete: true
        })
        if (code === 200 && data) {
            setUser(data)
            window.location.href = "/"
        }
        setProgress(false)
    }
    return (
        <Box mt={useBreakpointValue({
            base: '0px',
            lg: "30px",
        })} display={"flex"} justifyContent="center">
            <Box bg={'white'} p={5} borderRadius={5} w={useBreakpointValue({
                base: '100%',
                lg: "800px",
            })} minH={"300px"} >

                <Flex w={"100%"} mt={'10'} justifyContent={"center"} h={"150px"} alignItems={"center"}>
                    <Box w={'40'} h={'40'} display="flex" justifyContent={"center"} alignItems={"center"} bg={'brand.dark'} rounded={'full'}>
                        <FiCheck fontSize={"60px"} color="gray.400" />
                    </Box>
                </Flex>

                <Center mt={'2'}>
                    {router.asPath !== '/update-application' && <Text fontSize={'2xl'} fontWeight={'extrabold'} color={'brand.darker'}>Onboarding stage completed</Text>}
                    {router.asPath === '/update-application' && <Text fontSize={'2xl'} fontWeight={'extrabold'} color={'brand.darker'}>Done</Text>}
                </Center>

                <Center mt={'0.5'}>
                    <Text textAlign={'center'} fontSize={'xs'} color={'gray.500'}>You have provided all the information we require. Clicking the button below will send this for admin review. Be mindful of the fact that while admin is reviewing your details, you may not make any further changes.</Text>
                </Center>

                {router.asPath !== '/update-application' && <Flex mt={'8'} width="100%" justify="flex-end">
                    <Button
                        isDisabled={disabled}
                        mr={4} _hover={{ bg: 'transparent' }} bg='transparent'
                        onClick={prevFn}
                        size="sm"
                        variant="ghost"
                    >
                        Previous
                    </Button>
                    <Button isLoading={progress} _hover={{ bg: 'yellow.300' }} onClick={submitStep} color='brand.darker' bg={'brand.highlight'} size="sm">
                        Complete onboarding
                    </Button>
                </Flex>}
            </Box>
        </Box>
    )
}
