import useAlertListener from '@/hooks/useAlertListener'
import { useAuthStore } from '@/store/auth'
import { Box, FormLabel, Input, Icon, InputGroup, InputRightElement, Text, Button, useDisclosure, Flex, Progress } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import * as Joi from 'joi';
import { FiEye, FiEyeOff, FiInfo, FiMail } from 'react-icons/fi'

interface ForgotProps {
    switchScreens: (val: string) => void
}
export default function ResetPassword({ switchScreens }: ForgotProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { resetPassword, message, error } = useAuthStore()
    const [formData, setFormData] = useState({
        password: "",
        token: "",
        passwordStrength: 0,
        progress: false
    })

    const runValidatePassword = async (password: string) => {
        const lenSchema = Joi.string().min(8)
        const capSchema = Joi.string().regex(/[A-Z]/).message("must contain one uppercase");
        const lowerSchema = Joi.string().regex(/[a-z]/).message("must contain one uppercase")
        const numberSchema = Joi.string().regex(/(\d)/).message("must contain one number")
        const specialSchema = Joi.string().regex(/(\W)/).message("must contain one special character")

        const res = await Promise.all([capSchema.validate(password), lowerSchema.validate(password), numberSchema.validate(password), specialSchema.validate(password)]);
        let strenght = res.reduce((cumulation, curr) => {
            if (!curr.error) {
                return cumulation + 15;
            }
            return cumulation;
        }, 0)
        let ft = lenSchema.validate(password)
        if (!ft.error) {
            strenght = strenght + 40;
        }
        setFormData({ ...formData, passwordStrength: strenght })
    }

    useEffect(() => {
        runValidatePassword(formData.password)
    }, [formData.password])
    useAlertListener(useAuthStore, {
        pos: "bottom",
        message: error || message,
        status: error ? 'error' : 'success',
    });
    const submitForm = async () => {
        try {
            setFormData({ ...formData, progress: true })
            await resetPassword({ password: formData.password, token: formData.token });
            switchScreens("login")
            setFormData({ ...formData, progress: false })
        } catch (error) {
            setFormData({ ...formData, progress: false })
        }
    }

    return (
        <Box bg={'brand.darker'} borderRadius={8} py={10} px={6} width={"100%"}>
            <Box mb={"20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                <Text color={'gray.300'} fontSize={"22px"} fontWeight={"extrabold"}>Resetting your password?</Text>
                <Text color={'gray.400'} fontSize={"14px"}>Let's get it done!!</Text>
            </Box>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitForm()
            }}>
                <Box display={"flex"} gap={3} flexDir={"column"}>

                    <Box>
                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                            <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="password">Your new password</FormLabel>
                            <Box width={"50px"}>
                                <Progress colorScheme={'whatsapp'} value={formData.passwordStrength} size="xs" rounded={"md"} />
                            </Box>
                        </Flex>
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
                                children={<Icon as={isOpen ? FiEye : FiEyeOff} color='gray.400' />}
                            />
                        </InputGroup>
                    </Box>
                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="full-name">Your OTP</FormLabel>
                        <InputGroup>
                            <Input onChange={(e) => {
                                setFormData({ ...formData, token: e.target.value })
                            }} id='full-name' letterSpacing={5} fontSize={"14px"} color={'gray.400'} type='text' placeholder='******' />
                            <InputRightElement
                                pointerEvents='none'
                                children={<Icon as={FiInfo} color='gray.400' />}
                            />
                        </InputGroup>
                    </Box>

                    <Box pt={2}>
                        <Button isLoading={formData.progress} type='submit' color={'brand.darker'} _hover={{
                            bg: 'yellow.400'
                        }} bg={'brand.highlight'} w={"100%"}>Change password</Button>
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
