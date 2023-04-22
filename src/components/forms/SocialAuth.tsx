import { Box, Button, Center, FormLabel, Modal, Icon, ModalBody, ModalContent, ModalOverlay, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react'
import { useAuthStore } from '@/store/auth';
import {
    ChakraStylesConfig,
    Select,
} from "chakra-react-select";
import { FiCheck } from 'react-icons/fi';
import { countries } from '@/utils/countries';


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

interface SocialAuthProps {
    role: string;
    title: string;
}

const FinishRegisteration = ({ closeAuthModal, isAuthModalOpen, accessToken }: { isAuthModalOpen: boolean; closeAuthModal: () => void, accessToken: string }) => {
    const { finishRegister } = useAuthStore()
    const chakraStyles: ChakraStylesConfig = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            background: "transparent",
        }),
        option: (provided, state) => ({
            ...provided,
            background: state.isFocused ? "brand.darker" : "brand.dark",
            color: 'gray.300'
        }),
        container: (provided, state) => ({
            ...provided,
            color: 'gray.300'
        }),
        menuList: (provided, state) => ({
            ...provided,
            background: "brand.dark",
            color: 'gray.300'
        }),
    };

    const [formData, setFormData] = useState({
        accountType: "organizer",
        loadingState: false,
        country: ""
    })

    const submitFinally = async function () {
        try {
            setFormData({ ...formData, loadingState: true })
            await finishRegister(accessToken, formData.accountType, formData.country)
            closeAuthModal();
            setFormData({ ...formData, loadingState: false })
        } catch (error) {
            setFormData({ ...formData, loadingState: false })
            closeAuthModal();
        }
    }

    return <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <ModalOverlay />
        <ModalContent borderRadius={9}>
            <ModalBody bg="brand.darker" display={"flex"} flexDir="column" gap={5} p={10} borderRadius={8}>
                <Box mb={"20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                    <Text fontSize={"22px"} color="gray.400" fontWeight={"extrabold"}>Tell us more</Text>
                </Box>
                <Box >
                    <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="password">What do you do?</FormLabel>
                    <Box borderRadius={5} gap={2} display={"flex"} border={"1px"} borderColor={"gray.400"}>
                        {AccountTypes.map(acctType => <Box onClick={() => {
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
                    <Button onClick={() => submitFinally()} isLoading={formData.loadingState} type='button' color={'brand.darker'} _hover={{
                        bg: 'yellow.400'
                    }} bg={'brand.highlight'} w={"100%"}>Finish creating account</Button>
                </Box>
            </ModalBody>

        </ModalContent>
    </Modal>
}
export default function SocialAuth({ title, role }: SocialAuthProps) {

    const { loginGoogle } = useAuthStore()
    const [accessToken, setAccessToken] = useState("")
    const { isOpen: isAuthModalOpen, onOpen: openAuthModal, onClose: closeAuthModal } = useDisclosure()


    const btnClickAction = () => loginGoogle(role, (token) => {
        setAccessToken(token);
        openAuthModal();
    })

    return (
        <div>
            <Button onClick={
                () => btnClickAction()
            } w={'full'} bg={'brand.darker'} _hover={{ bg: 'brand.white' }} variant={'outline'} leftIcon={<FcGoogle />}>
                <Center>
                    <Text color={'gray.400'}>{title}</Text>
                </Center>
            </Button>

            {isAuthModalOpen && <FinishRegisteration isAuthModalOpen={isAuthModalOpen} closeAuthModal={closeAuthModal} accessToken={accessToken} />}
        </div>
    )
}
