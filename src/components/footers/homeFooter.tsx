import { ReactNode } from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
    Image,
    Flex,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

import AppStoreBadge from '/public/appStoreBadge.svg';
import PlayStoreBadge from '/public/playStoreBadge.svg';

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

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
            bg={'brand.primary'}
            rounded={'full'}
            w={'8'}
            h={'8'}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function HomeFooter() {
    return (
        <Flex justifyContent={'center'}>
            <Box width={"100%"} maxW={"1440px"} px={'5'}>
                <Flex px={'15'} align="start" flexDir={'row'}
                    justify="start" py={10}>
                    <Stack w={'200px'} align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link href={'#'}>About Us</Link>
                        <Link href={'#'}>Blog</Link>
                        <Link href={'#'}>Careers</Link>
                        <Link href={'#'}>Contact Us</Link>
                        <Link href={'#'}>Help Center</Link>
                    </Stack>

                    <Stack w={'200px'} align={'flex-start'}>
                        <ListHeader>Legal</ListHeader>
                        <Link href={'#'}>Cookies Policy</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Terms of Service</Link>

                        <ListHeader>Control</ListHeader>
                        <Link href={'#'}>Control panel</Link>
                    </Stack>

                    <Stack w={'200px'} align={'flex-start'}>
                        <ListHeader>Find spaces faster</ListHeader>
                        <Link>
                            <Image src={AppStoreBadge.src} h="35px" />
                        </Link>
                        <Link>
                            <Image src={PlayStoreBadge.src} h="35px" />
                        </Link>
                    </Stack>
                </Flex>

                <Box
                    borderTopWidth={1}
                    borderStyle={'solid'}
                    borderColor={'gray.200'}>
                    <Container
                        as={Flex}
                        maxW={'6xl'}
                        py={4}
                        direction={{ base: 'column', md: 'row' }}
                        justify={'space-between'}
                        align={'center'}>
                        <Text>© 2023 Urbanspaces. All rights reserved</Text>
                        <Stack direction={'row'} spacing={3}>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <FaTwitter color='white' />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                                <FaYoutube color='white' />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <FaInstagram color="white" />
                            </SocialButton>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Flex>
    );
}