import { useAuthStore } from '@/store/auth';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    Input,
    useDisclosure,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
    MenuDivider,
    Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
    FiMenu,
    FiX,
    FiChevronDown,
    FiChevronRight,
    FiSearch,
} from 'react-icons/fi';
import LayoutRightSide from '../RightSide/LayoutRightSide';



export default function DefaultNavigationBar() {
    const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();
    const { isOpen: isAuthModalOpen, onOpen: openAuthModal, onClose: closeAuthModal } = useDisclosure()
    const [defaultScreen, setDefaultScreen] = useState("")
    const { access, user, logoutAccount } = useAuthStore()
    const linkColor = useColorModeValue('gray.200', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.400', 'white');

    const logoutBtnClick = async () => {
        await logoutAccount();
        window.location.href = "/";
    }


    return (
        <Box>
            <Flex
                bg={useColorModeValue('brand.dark', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2, xl: 5, lg: 4 }}
                px={{ base: 4 }}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        bg={'brand.dark'}
                        _hover={{
                            bg: 'brand.dark'
                        }}
                        icon={
                            isMobileNavOpen ? <Icon as={FiX} color={'white'} w={5} h={5} /> : <Icon color={'white'} as={FiMenu} w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1, md: 1 }} alignItems="center" justify={{ base: 'center', md: 'start' }}>

                    <Link
                        p={2}
                        href={'/'}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                        }}>
                        <AppLogo />
                    </Link>
                    <Flex flex={{ base: 1, md: 0.7 }} display={{ base: 'none', md: 'flex' }} ml={10}>
                        <SearchComponent />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0.5 }}
                    justify={'flex-end'}
                    alignItems={'center'}
                    direction={'row'}
                    spacing={6}>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                    {access === undefined && <Button onClick={() => {
                        setDefaultScreen("login")
                        openAuthModal()
                    }}
                        fontSize={'sm'}
                        color={'brand.white'}
                        border={'1px solid white'}
                        fontWeight={400}
                        bg={'transparent'}
                        _hover={{
                            bg: 'gray.700'
                        }}
                    >
                        Sign In
                    </Button>}
                    {access === undefined && <Button onClick={() => {
                        setDefaultScreen("register")
                        openAuthModal()
                    }}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'brand.dark'}
                        bg={'brand.highlight'}
                        _hover={{
                            bg: 'yellow.300',
                        }}>
                        Sign Up
                    </Button>}

                    {access && access.granted && <Flex alignItems={'center'}>
                        {/* <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                        >
                            Action
                        </Button> */}
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar referrerPolicy="no-referrer"
                                    size={'sm'}
                                    src={
                                        user?.avatar
                                    }
                                />
                            </MenuButton>
                            <MenuList gap={0} bg={"brand.dark"} py={1} borderColor={"gray.500"}>
                                <MenuItem as={'a'} href="/inbox" color={'gray.300'} _hover={{ bg: "brand.darker" }} bg={"brand.dark"}>Inbox</MenuItem>
                                <MenuItem as={'a'} href="/bookings" color={'gray.300'} _hover={{ bg: "brand.darker" }} bg={"brand.dark"}>Bookings</MenuItem>
                                <MenuItem color={'gray.300'} _hover={{ bg: "brand.darker" }} bg={"brand.dark"}>Calendar</MenuItem>
                                <MenuItem color={'gray.300'} _hover={{ bg: "brand.darker" }} bg={"brand.dark"}>Profile</MenuItem>
                                <MenuDivider color={'gray.300'} />
                                <MenuItem onClick={() => logoutBtnClick()} color={'gray.300'} _hover={{ bg: "brand.darker" }} bg={"brand.dark"}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>}
                </Stack>
            </Flex>
            {access && access.granted && user && user.accountStatus === 'pending' && <Flex gap={2} py={2} justifyContent={"center"}>
                {!user.review || user.review.lastReviewed !== "admin" && <Badge px={4} colorScheme={'whatsapp'} rounded={'sm'}>Your account under review. Check back in under 12hrs.</Badge>}
                {user.review && user.review.lastReviewed === "admin" && <Flex gap={1}>
                    <Text fontSize={"14px"}>Admin has left some comments for you. </Text>
                    <Button fontSize={'14px'} variant={'link'} as={'a'} href={'/update-application'}>Click here</Button> <Text fontSize={"14px"}>make the neccessary changes </Text>
                </Flex>}
            </Flex>}

            <Collapse in={isMobileNavOpen} animateOpacity>
                <MobileNav />
            </Collapse>

            <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
                <ModalOverlay />
                <ModalContent borderRadius={9}>
                    <ModalBody p={0} borderRadius={8}>
                        <LayoutRightSide isModal={true} closeModal={closeAuthModal} defaultScreen={defaultScreen} />
                    </ModalBody>

                </ModalContent>
            </Modal>
        </Box>
    );
}

const SearchComponent = () => {
    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                children={<Icon as={FiSearch} color='gray.300' />}
            />
            <Input color={'gray.400'} type='text' placeholder='Search for artist profiles' />
        </InputGroup>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.200', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.400', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={FiChevronRight} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('brand.dark', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            <Flex flex={{ md: 1 }} display={{ base: 'flex', md: 'none' }}>
                <SearchComponent />
            </Flex>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

export const AppLogo = () => {

    return (
        <div>
            <Text
                _hover={{ color: 'gray.200' }}
                fontWeight={900}
                color={useColorModeValue('gray.200', 'gray.200')}>
                StageSeekers
            </Text>
        </div>
    )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();
    const { isOpen: isAuthModalOpen, onOpen: openAuthModal, onClose: closeAuthModal } = useDisclosure()

    return (
        <Box>
            <Stack spacing={4} onClick={children && onToggle}>
                <Flex
                    py={2}
                    as={Link}
                    href={href ?? '#'}
                    justify={'space-between'}
                    align={'center'}
                    _hover={{
                        textDecoration: 'none',
                    }}>
                    <Text
                        _hover={{ color: 'gray.200' }}
                        fontWeight={600}
                        color={useColorModeValue('gray.400', 'gray.200')}>
                        {label}
                    </Text>
                    {children && (
                        <Icon
                            as={FiChevronDown}
                            transition={'all .25s ease-in-out'}
                            transform={isMobileNavOpen ? 'rotate(180deg)' : ''}
                            w={6}
                            h={6}
                        />
                    )}
                </Flex>

                <Collapse in={isMobileNavOpen} animateOpacity style={{ marginTop: '0!important' }}>
                    <Stack
                        mt={2}
                        pl={4}
                        borderLeft={1}
                        borderStyle={'solid'}
                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                        align={'start'}>
                        {children &&
                            children.map((child) => (
                                <Link key={child.label} py={2} href={child.href}>
                                    {child.label}
                                </Link>
                            ))}
                    </Stack>
                </Collapse>
            </Stack>
        </Box>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Top artists',
        href: '?filter=top',
    },
    {
        label: 'Live artists',
        href: '?filter=live',
    },
];