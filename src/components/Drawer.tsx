import React from 'react';
import {
    Drawer, DrawerBody, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Flex
} from "@chakra-ui/react";
import { DrawerInterface } from '@/data/navigation.interface';


export default function DrawerExample({
    width,
    isOpen,
    children,
    onClose,
}: DrawerInterface) {
    const p = 15;
    return (
        <Flex>
            <Drawer
                isOpen={isOpen}
                placement={"right"}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent maxW={width} bg={'brand.primary'} alignItems="center">
                    <DrawerCloseButton color={"white"} alignSelf="end" mx={p} my={p} />
                    <DrawerBody mt={"16"}>{children}</DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
}