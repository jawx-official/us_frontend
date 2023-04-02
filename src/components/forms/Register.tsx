import useAlertListener from '@/hooks/useAlertListener';
import { useAuthStore } from '@/store/auth';
import { countries } from '@/utils/countries';
import * as Joi from 'joi';
import {
    Box, Text, Input,
    InputGroup, Icon,
    InputRightElement,
    useDisclosure,
    FormLabel,
    Button,
    useBreakpointValue,
    Flex,
    Progress,
} from '@chakra-ui/react'
import {
    ChakraStylesConfig,
    Select,
} from "chakra-react-select";
import React, { useEffect, useState } from 'react'
import { FiUser, FiMail, FiCheck, FiEye, FiEyeOff } from "react-icons/fi"
import SocialAuth from './SocialAuth';

const AccountTypes = [
    {
        title: "I'm an organizer",
        title_short: "Organizer",
        value: "organizer"
    },
    {
        title: "I'm an artist",
        title_short: "Artist",
        value: "artist"
    },
]

interface RegisterProps {
    switchScreens: (val: string) => void
}

export default function Register({ switchScreens }: RegisterProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const chakraStyles: ChakraStylesConfig = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            background: "transparent",
        }),
        container: (provided, state) => ({
            ...provided,
            color: 'gray.300'
        }),
        option: (provided, state) => ({
            ...provided,
            background: state.isFocused ? "brand.darker" : "brand.dark",
            color: 'gray.300'
        }),
        menuList: (provided, state) => ({
            ...provided,
            background: "brand.dark",
            color: 'gray.300'
        }),
    };
    const { Signup, authProgress, error, message } = useAuthStore()
    const [formData, setFormData] = useState({
        accountType: "organizer",
        country: "",
        name: "",
        email: "",
        password: "",
        progress: false,
        passwordStrength: 0,
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

    const submitFn = async function () {
        try {
            setFormData({ ...formData, progress: true })
            await Signup({
                accountType: formData.accountType,
                country: formData.country,
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            switchScreens("verify-account")
            setFormData({ ...formData, progress: false })
        } catch (error) {
            setFormData({ ...formData, progress: false })
        }
    }
    return (
        <Box bg={'brand.darker'} borderRadius={8} py={10} px={6} width={"100%"}>
            <Box mb={"20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                <Text fontSize={"22px"} fontWeight={"extrabold"}>Join now</Text>
                <Text fontSize={"14px"}>Get 10% discount on your first month!!</Text>
            </Box>

            <Box mt={2} mb={7}>
                <SocialAuth role="register" title='Register with Google' />
            </Box>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitFn()
            }}>
                <Box display={"flex"} gap={3} flexDir={"column"}>

                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="full-name">Your full name</FormLabel>
                        <InputGroup>
                            <Input onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value })
                            }} id='full-name' fontSize={"14px"} color={'gray.400'} type='text' placeholder='Simon Blackwell' />
                            <InputRightElement
                                pointerEvents='none'
                                children={<Icon as={FiUser} color='gray.400' />}
                            />
                        </InputGroup>
                    </Box>

                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="email">Your email address</FormLabel>
                        <InputGroup>
                            <Input onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                            }} id='email' fontSize={"14px"} color={'gray.400'} type='email' placeholder='simon@dumonge.com' />
                            <InputRightElement
                                pointerEvents='none'
                                children={<Icon as={FiMail} color='gray.400' />}
                            />
                        </InputGroup>
                    </Box>
                    <Box>
                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                            <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="password">Your password</FormLabel>
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
                                children={<Flex alignItems={'center'}>
                                    <Icon as={isOpen ? FiEye : FiEyeOff} color='gray.400' />
                                </Flex>}
                            />
                        </InputGroup>
                    </Box>
                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="password">What do you do?</FormLabel>
                        <Box borderRadius={5} gap={2} display={"flex"} border={"1px"} borderColor={"gray.400"}>
                            {AccountTypes.map((acctType) => <Box key={acctType.value} onClick={() => {
                                setFormData({ ...formData, accountType: acctType.value })
                            }} fontSize={"14px"} color={'gray.400'} flexDir={useBreakpointValue({ base: "column", md: "column", lg: "column", xl: "row" })} display={'flex'} alignItems={'center'} gap={2} cursor={"pointer"} borderLeftRadius={5} py={2} pl={4} flex={1} >
                                <Box h={4} display="flex" justifyContent={"center"} alignItems="center" w={4} fontSize={"12px"} borderRadius={"100%"} bg={formData.accountType === acctType.value ? 'brand.highlight' : 'gray.600'}>
                                    {formData.accountType === acctType.value && <Icon as={FiCheck} color={'brand.darker'} />}
                                </Box>
                                <Text>{acctType.title}</Text>
                            </Box>)}
                        </Box>
                    </Box>


                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="password">Country of residence?</FormLabel>
                        <Select value={countries.find(d => d.label === formData.country)} onChange={(value: any) => {
                            setFormData({ ...formData, country: value.label })
                        }} selectedOptionStyle="check" chakraStyles={
                            chakraStyles
                        }
                            options={countries}
                        />
                    </Box>

                    <Box pt={2}>
                        <Button isLoading={authProgress} type='submit' color={'brand.darker'} _hover={{
                            bg: 'yellow.400'
                        }} bg={'brand.highlight'} w={"100%"}>Create account</Button>
                    </Box>

                    <Box display={"flex"} gap={1} justifyContent={'center'}>
                        <Text color={'gray.400'} fontSize={"11px"}>Do you already have an account?</Text>
                        <Text color={'brand.highlight'} cursor={"pointer"} onClick={() => {
                            switchScreens("login")
                        }} fontSize={"11px"}>Login here</Text>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
