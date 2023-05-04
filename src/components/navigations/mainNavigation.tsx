import { Image, Flex, Button, HStack, chakra, Link, Menu, MenuButton, MenuList, MenuItem, useMediaQuery } from '@chakra-ui/react';
import Logo from '/public/logo-light.png';
import React from "react";
import { NavigationItems } from '@/data/navigation.interface';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MobileDrawer from './mobileNav';

function formatPhoneNumber(phoneNumberString: string) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '+(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4];
    }
    return "";
}

const data: NavigationItems[] = [
    {
        label: formatPhoneNumber("2348138641965"),
        path: "tel:+2348138641965"
    },
    {
        label: "Buy",
        path: "",
        dropdown: true,
        children: [
            {
                label: "Find an agent",
                path: "/find-agent"
            },
            {
                label: "Buy with Urbanspaces premium",
                path: "/buy-with-premium"
            },
            {
                label: "Homes for sale",
                path: "/find-agent"
            },
            {
                label: "Apartments for sale",
                path: "/find-agent"
            },
            {
                label: "Land for sale",
                path: "/find-agent"
            },
            {
                label: "Home buying guide",
                path: "/buying-guide"
            },
        ]
    },
    {
        label: "Rent",
        path: "",
        dropdown: true,
        children: [
            {
                label: "Find an agent",
                path: "/find-agent"
            },
            {
                label: "Rent with Urbanspaces premium",
                path: "/rent-with-premium"
            },
            {
                label: "Homes for rent",
                path: "/find-agent"
            },
            {
                label: "Apartments for rent",
                path: "/find-agent"
            },
            {
                label: "Offices for rent",
                path: "/find-agent"
            },
            {
                label: "Renting guide",
                path: "/buying-guide"
            },
        ]
    },
    {
        label: "Sell",
        path: "",
        dropdown: true,
        children: [
            {
                label: "Find an agent",
                path: "/find-agent"
            },
            {
                label: "Sell with Urbanspaces premium",
                path: "/rent-with-premium"
            },
            {
                label: "What's my home worth",
                path: "/find-agent"
            },
        ]
    },
    {
        label: "Premium",
        path: "/premium"
    },
    {
        label: "Other Services",
        path: "",
        dropdown: true,
        children: [
            {
                label: "Paysmosmo",
                path: "/pay-small-small"
            },
            {
                label: "Find a roommate",
                path: "/find-a-room-mate"
            }
        ]
    },
];

const CTA = "Log in"
const CTA2 = "Get started"

const MEDIUM_SCREEN_BREAKPOINT = "768px";


export default function MainNavigation() {
    const [isMediumScreenOrLarger] = useMediaQuery(`(min-width: ${MEDIUM_SCREEN_BREAKPOINT})`);
    return (
        <Flex
            w="100vw"
            px="5"
            py="2"
            align="center"
            justify="space-between"
        >
            <Image src={Logo.src} h="35px" />

            {isMediumScreenOrLarger && <HStack as="nav" spacing="1">
                {data.map((item, i) => item.dropdown ? (<Menu key={i}>
                    <MenuButton color={'white'} _hover={{ bg: 'transparent', color: 'gray.400' }} _active={{ bg: 'transparent', color: 'gray.400' }} bg={'transparent'} fontSize={'13px'} as={Button} rightIcon={<ChevronDownIcon />}>
                        {item.label}
                    </MenuButton>
                    <MenuList rounded={'xl'} w={'320px'} shadow={'xl'} bg={'white'}>
                        {item.children?.map((child) => (<MenuItem px={'5'} fontSize={'13px'}>{child.label}</MenuItem>))}
                    </MenuList>
                </Menu>) : (
                    <Button color={'white'} as={Link} href={item.path} _hover={{ bg: 'transparent', color: 'gray.400' }} _active={{ bg: 'transparent', color: 'gray.400' }} bg={'transparent'} fontSize={'13px'} key={i}> {item.label} </Button>
                ))}
            </HStack>}

            <HStack mr={''}>
                <Button as={Link} href={"/auth"} display={isMediumScreenOrLarger ? "flex" : "none"} border={'1px'} borderColor={'gray.500'} rounded={'none'} _hover={{ bg: 'transparent', color: 'gray.400' }} bg={'transparent'} px={'5'} color={'white'} fontSize={'13px'}>
                    {CTA}
                </Button>
                <Button as={Link} href={"/auth/register"} display={isMediumScreenOrLarger ? "flex" : "none"} border={'1px'} borderColor={'gray.500'} rounded={'none'} _hover={{ bg: 'transparent', color: 'gray.400' }} bg={'transparent'} px={'5'} color={'white'} fontSize={'13px'}>
                    {CTA2}
                </Button>
                {!isMediumScreenOrLarger && <MobileDrawer menu={data} />}
            </HStack>

        </Flex>
    );
}