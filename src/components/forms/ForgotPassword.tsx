import useAlertListener from '@/hooks/useAlertListener'
import { useAuthStore } from '@/store/auth'
import { Box, FormLabel, Input, Icon, InputGroup, InputRightElement, Text, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiMail } from 'react-icons/fi'

interface ForgotProps {
    switchScreens: (val: string) => void
}
export default function ForgotPassword({ switchScreens }: ForgotProps) {
    const { forgotPassword, message, error } = useAuthStore()
    const [formData, setFormData] = useState({
        email: "",
        progress: false
    })
    const submitForm = async () => {
        try {
            setFormData({ ...formData, progress: true })
            await forgotPassword({ email: formData.email });
            switchScreens("reset-password")
            setFormData({ ...formData, progress: false })
        } catch (error) {
            setFormData({ ...formData, progress: false })
        }
    }

    useAlertListener(useAuthStore, {
        pos: "bottom",
        message: error || message,
        status: error ? 'error' : 'success',
    });


    return (
        <Box bg={'brand.darker'} borderRadius={8} py={10} px={6} width={"100%"}>
            <Box mb={"20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                <Text color={'gray.300'} fontSize={"22px"} fontWeight={"extrabold"}>Forgot your password?</Text>
                <Text color={'gray.400'} fontSize={"14px"}>You'll get an email with a 6-digit code</Text>
            </Box>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitForm()
            }}>
                <Box display={"flex"} gap={3} flexDir={"column"}>

                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="email">Your email address</FormLabel>
                        <InputGroup>
                            <Input onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                            }} id='email' fontSize={"14px"} color={'gray.400'} type='email' placeholder='simon@dumonge.com' />
                            <InputRightElement
                                pointerEvents='none'
                                children={<Icon as={FiMail} color='gray.300' />}
                            />
                        </InputGroup>
                    </Box>

                    <Box pt={2}>
                        <Button isLoading={formData.progress} type='submit' color={'brand.darker'} _hover={{
                            bg: 'yellow.400'
                        }} bg={'brand.highlight'} w={"100%"}>Request reset</Button>
                    </Box>

                    <Box display={"flex"} gap={1} justifyContent={'center'}>
                        <Text fontSize={"11px"} color={'gray.400'} >Do you already have an account?</Text>
                        <Text color={'brand.highlight'} cursor={"pointer"} onClick={() => {
                            switchScreens("login")
                        }} fontSize={"11px"}>Login here</Text>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
