import useAlertListener from '@/hooks/useAlertListener'
import { useAuthStore } from '@/store/auth'
import { Box, FormLabel, Input, InputGroup, InputRightElement, Text, Icon, Alert, AlertDescription, Button } from '@chakra-ui/react'
import React, { useState } from 'react'



interface VerifyProps {
    switchScreens: (val: string) => void
}

export default function VerifyAccount({ }: VerifyProps) {
    const [formData, setFormData] = useState({
        token: "",
        progress: false

    })
    const { Verify, error, message } = useAuthStore()
    useAlertListener(useAuthStore, {
        pos: "bottom",
        message: error || message,
        status: error ? 'error' : 'success',
    });
    const submitForm = async () => {
        try {
            setFormData({ ...formData, progress: true })
            await Verify({ token: formData.token });
            setFormData({ ...formData, progress: false })
        } catch (error) {
            setFormData({ ...formData, progress: false })

        }
    }
    return (
        <Box bg={'brand.darker'} borderRadius={8} py={10} px={6} width={"100%"}>
            <Box mb={"20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                <Text fontSize={"22px"} fontWeight={"extrabold"}>Account verification</Text>
                <Text fontSize={"14px"}>Let's verify you're who you say you are</Text>
            </Box>
            <Alert my={3} bg={'brand.highlight'} borderRadius={5} fontSize={13} color={'brand.darker'} status='error'>
                <AlertDescription>We have sent a verification code to your email address. Enter it here to confirm your account.
                    If you have not received it,
                    <Text color={'gray.100'} cursor={"pointer"} onClick={() => {
                    }} fontWeight={'bold'}>resend it here</Text>
                </AlertDescription>
            </Alert>
            <form onSubmit={(e) => {
                e.preventDefault()
                submitForm()
            }}>
                <Box display={"flex"} gap={3} flexDir={"column"}>
                    <Box>
                        <FormLabel fontSize={"13px"} color={'gray.400'} htmlFor="full-name">Verification code</FormLabel>
                        <InputGroup>
                            <Input onChange={(e) => {
                                setFormData({ ...formData, token: e.target.value })
                            }} id='full-name' fontSize={"14px"} color={'gray.400'} fontWeight={"extrabold"} letterSpacing={4} maxLength={6} type='text' placeholder='221350' />
                        </InputGroup>
                    </Box>

                    <Box pt={2}>
                        <Button isLoading={formData.progress} type='submit' color={'brand.darker'} _hover={{
                            bg: 'yellow.400'
                        }} bg={'brand.highlight'} w={"100%"}>Verify account</Button>
                    </Box>
                </Box>
            </form>
        </Box >
    )
}
