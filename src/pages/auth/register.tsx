import RegisterForm from '@/components/forms/RegisterForm'
import SEO from '@/components/seo'
import AuthLayout from '@/layouts/authLayout'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export default function RegisterPage() {
    return (
        <Box>
            <SEO title='Register account' />
            <Flex justifyContent={'center'}>
                <Flex flexDirection={'column'}>
                    <Text fontWeight={'extrabold'} color="brand.primary" textTransform={'uppercase'} fontSize={'30px'} textAlign={'center'}>Register</Text>
                    <Text textTransform={'uppercase'} color="brand.primary" textAlign={'center'} fontSize={'14px'}>Let's get started now</Text>
                </Flex>
            </Flex>
            <RegisterForm />
        </Box>
    )
}


RegisterPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}