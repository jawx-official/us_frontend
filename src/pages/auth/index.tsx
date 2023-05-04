import LoginForm from '@/components/forms/LoginForm'
import { OAuthButtonGroup } from '@/components/forms/OAuthButtonGroup'
import SEO from '@/components/seo'
import AuthLayout from '@/layouts/authLayout'
import { Box, Button, Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export default function LoginPage() {
    return (
        <Box>
            <SEO title='Login' />
            <Flex justifyContent={'center'}>
                <Flex flexDirection={'column'}>
                    <Text fontWeight={'extrabold'} color="brand.primary" textTransform={'uppercase'} fontSize={'30px'} textAlign={'center'}>Login</Text>
                    <Text textTransform={'uppercase'} color="brand.primary" textAlign={'center'} fontSize={'14px'}>Let's get you authenticated</Text>
                </Flex>
            </Flex>

            <Stack my={'3'} spacing="6">
                <OAuthButtonGroup />

                <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                        or continue with
                    </Text>
                    <Divider />
                </HStack>

                <LoginForm />
            </Stack>
        </Box>
    )
}


LoginPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}