import { useDisclosure, Flex, Box, Button, VStack, Icon, Text, HStack, Link as ChakraLink, Link, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, MenuList, MenuItem, ListItem, List } from "@chakra-ui/react";
import Drawer from '../Drawer';
import React from "react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavigationItems } from "@/data/navigation.interface";


export default function MobileDrawer({ menu }: { menu: NavigationItems[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex >
            <Button size={'xs'} _hover={{ bg: 'transparent', color: 'gray.400' }} bg={'transparent'} onClick={onOpen}>
                <HamburgerIcon color={'white'} />
            </Button>

            <Drawer width="350px"
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack>
                    {menu.map((item, i) => item.dropdown ? (<Accordion allowMultiple>
                        <AccordionItem border={'none'}>
                            <Box width={"300px"}>
                                <AccordionButton border={'none'}>
                                    <Box color={'white'} _hover={{ color: 'gray.400' }} fontSize={'13px'} as="span" flex='1' textAlign='left'>
                                        {item.label}
                                    </Box>
                                    <AccordionIcon color={'white'} fontSize={'13px'} />
                                </AccordionButton>
                            </Box>
                            <AccordionPanel width={'300px'}>
                                <VStack width={'300px'}>
                                    <Box width={'290px'} display={'flex'} gap={'2'} flexDir={'column'}>
                                        {item.children?.map((child) => (<Link _hover={{ color: 'gray.400' }} href={child.path} color={'white'} fontSize={'12px'}>{child.label}</Link>))}
                                    </Box>
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem></Accordion>) : (
                        <Box width={"268px"}>
                            <Link href={item.path} _hover={{ color: 'gray.400' }} color={'white'} fontSize={'13px'} key={i}> {item.label} </Link>
                        </Box>
                    ))}
                </VStack>
            </Drawer>
        </Flex>
    );
};