import {
    Box,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { AppLogo } from '.';

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={'blackAlpha.300'}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            color={'gray.400'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function MainFooter() {
    return (
        <Box
            bg={'brand.dark'}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <AppLogo />
                <Stack direction={'row'} spacing={6}>
                    <Link color={'gray.400'} href={'/'}>Home</Link>
                    <Link color={'gray.400'} href={'/admin/auth'}>Admin</Link>
                    <Link color={'gray.400'} href={'/contact'}>Contact</Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={'gray.500'}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text color={'gray.400'}>© We do all tech. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'https://twitter.com/stageseekers'}>
                            <FaTwitter color={'gray.400'} />
                        </SocialButton>
                        <SocialButton label={'YouTube'} href={'https://youtube.com/stage-seekers'}>
                            <FaYoutube color={'gray.400'} />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'https://instagram.com/stageseekers'}>
                            <FaInstagram color={'gray.400'} />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}