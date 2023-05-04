import React, { useState } from 'react'
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    InputGroup,
    Icon,
    InputRightElement,
    HStack,
    Box,
    Text,
} from '@chakra-ui/react';
import { FiEyeOff, FiEye } from "react-icons/fi"

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form action="">
            <Stack spacing={4}>
                <HStack>
                    <Box>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="lastName">
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" />
                        </FormControl>
                    </Box>
                </HStack>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <Icon as={FiEye} /> : <Icon as={FiEyeOff} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                    <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Sign up
                    </Button>
                </Stack>
                <Stack pt={6}>
                    <Text align={'center'}>
                        Already a user? <Link color={'blue.400'}>Login</Link>
                    </Text>
                </Stack>
            </Stack>
        </form>
    )
}
