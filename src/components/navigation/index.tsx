import { Flex, Spacer, Input, InputGroup, InputLeftElement, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, Popover, PopoverTrigger, PopoverContent, PopoverBody, Link } from "@chakra-ui/react";
import { HiSearch, HiGlobe, HiUser, HiUsers, HiMenu } from 'react-icons/hi';

function Navigation() {
    return (
        <Flex h={'40'} position={'fixed'} top="0" left="0" right="0" bg="white" flexDir={'column'}>
            <Flex px={4} h={'16'} boxShadow="sm" py={2} align="center">
                <Flex align="center">
                    <IconButton icon={<HiMenu />} variant="ghost" display={{ base: "block", md: "none" }} mr={2} aria-label={""} />
                    <Button variant="ghost" fontWeight="bold" fontSize="lg" color="gray.800">Logo</Button>
                </Flex>
                <Spacer />
                <Flex display={{ base: "none", md: "flex" }} alignItems="center" mr={4}>
                    <Popover trigger="hover">
                        <PopoverTrigger>
                            <Button ml={4}>Agents</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverBody>
                                <Button variant="ghost" w="full" textAlign="left">Become an Agent</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Button variant="ghost">Login</Button>
                    <Button variant="ghost">Register</Button>
                    <Menu>
                        <MenuButton as={Button} variant="ghost">
                            <Avatar size="sm" name="User" src="https://avatars.githubusercontent.com/u/51461445?v=4" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<HiUser />} command="Shift+T">Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <Flex>
                <InputGroup maxW="md">
                    <InputLeftElement pointerEvents="none" children={<HiSearch color="gray.400" />} />
                    <Input type="text" placeholder="Search" size="md" focusBorderColor="blue.500" />
                </InputGroup>
            </Flex>
        </Flex>
    );
}

export default Navigation;