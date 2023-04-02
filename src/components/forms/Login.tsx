import useAlertListener from '@/hooks/useAlertListener'
import { useAuthStore } from '@/store/auth'
import { Box, FormLabel, Input, InputGroup, Icon, InputRightElement, Text, useDisclosure, Button, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi"
import SocialAuth from './SocialAuth'

interface LoginProps {
    switchScreens: (val: string) => void;
    hideRegister?: boolean;
    admin?: boolean;
}

export default function Login({ switchScreens, hideRegister, admin }: LoginProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { Login, authProgress, error, message } = useAuthStore()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        progress: false
    })
    useAlertListener(useAuthStore, {
        pos: "bottom",
        message: error || message,
        status: error ? 'error' : 'success',
    });

    useEffect(() => {
        if (error && error.endsWith('confirmation link')) {
            switchScreens('verify-account')
        }
    }, [error])
    const submitBtn = async () => {
        try {
            setFormData({ ...formData, progress: true });
            let payload: any = { email: formData.email, password: formData.password };
            if (admin) {
                payload.admin = true
            }
            await Login(payload);
            setFormData({ ...formData, progress: false });
            if (admin) {
                window.location.href = "/admin/dashboard"
            }
        } catch (error) {
            setFormData({ ...formData, progress: false });
        }
    }
    return (
        <Box bg={'brand.darker'} borderRadius={8} py={10} px={6} width={"100%"}>
            <Box mb={"20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                {!admin && <Text color={'gray.300'} fontSize={"22px"} fontWeight={"extrabold"}>Login here</Text>}
                {admin && <Text color={'gray.300'} fontSize={"22px"} fontWeight={"extrabold"}>Admin login here</Text>}
                <Text color={'gray.400'} fontSize={"14px"}>Login now to access all features!!</Text>
            </Box>
            {!admin && <Box mt={2} mb={7}>
                <SocialAuth title='Sign in with Google' role='login' />
            </Box>}

            <form onSubmit={(e) => {
                e.preventDefault();
                submitBtn()
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
                    <Box>
                        <Box display={"flex"} justifyContent="space-between">
                            <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="password">Your password</FormLabel>
                            <Text color={'gray.400'} cursor={"pointer"} onClick={() => {
                                switchScreens("forgot-password")
                            }} fontSize={"13px"}>Forgot password</Text>
                        </Box>
                        <InputGroup>
                            <Input onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                            }} id='password' fontSize={"14px"} color={'gray.400'} type={isOpen ? 'text' : 'password'} placeholder='******' />
                            <InputRightElement onClick={() => {
                                if (isOpen) {
                                    onClose()
                                } else {
                                    onOpen()
                                }
                            }}
                                pointerEvents='all'
                                children={<Icon as={isOpen ? FiEye : FiEyeOff} color='gray.300' />}
                            />
                        </InputGroup>
                    </Box>

                    <Box pt={2}>
                        <Button isLoading={formData.progress} type='submit' color={'brand.darker'} _hover={{
                            bg: 'yellow.400'
                        }} bg={'brand.highlight'} w={"100%"}>Login now</Button>
                    </Box>

                    {!hideRegister && <Box display={"flex"} gap={1} justifyContent={'center'}>
                        <Text fontSize={"11px"} color={'gray.400'} >Don't have an account?</Text>
                        <Text color={'brand.highlight'} cursor={"pointer"} onClick={() => {
                            switchScreens("register")
                        }} fontSize={"11px"}>Create account here</Text>
                    </Box>}
                </Box>
            </form>
        </Box>
    )
}
