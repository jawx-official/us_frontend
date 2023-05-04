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
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEyeOff, FiEye } from "react-icons/fi"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form action="">
            <Flex flex={1} w={'full'} align={'center'} justify={'start'}>
                <Stack spacing={4} w={'full'}>
                    <FormControl w={'full'} id="email">
                        <FormLabel textTransform={'uppercase'} fontSize={'13px'}>Email address</FormLabel>
                        <Input placeholder='Email address' type="email" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel textTransform={'uppercase'} fontSize={'13px'}>Password</FormLabel>
                        <InputGroup>
                            <Input placeholder='Password' type={showPassword ? 'text' : 'password'} />
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
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Link color={'blue.500'}>Forgot password?</Link>
                        </Stack>
                        <Button type='submit' bg={'brand.primary'} _hover={{ bg: 'brand.primary' }} color={'white'} variant={'solid'}>
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}