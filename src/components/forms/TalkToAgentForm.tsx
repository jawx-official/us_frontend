import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Spacer, Text, Textarea } from '@chakra-ui/react'
import { Field, Form, Formik, FieldProps } from 'formik'
import React from 'react'

interface CustomFieldProps extends FieldProps {
    field: {
        value: string;
        name: string;
        onBlur: () => void;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
}

interface CustomFieldProps2 extends FieldProps {
    field: {
        value: string;
        name: string;
        onBlur: () => void;
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }
}

export default function TalkToAgentForm() {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignContent={'center'}>
            <Formik
                initialValues={{ location: 'Maitama, Abuja', email: "", phone: "", message: "" }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }, 1000)
                }}
            >
                {(props) => (
                    <Form>
                        <Field name='location'>
                            {({ field, form }: CustomFieldProps) => (
                                <FormControl mb={'3'} isRequired isInvalid={!!form.errors.location && !!form.touched.location}>
                                    <FormLabel>Where are you searching for homes?</FormLabel>
                                    <Input borderColor={'gray.500'} rounded={'none'} {...field} placeholder='City, address, postcode' />
                                    <FormErrorMessage>{form.errors.location as string}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='email'>
                            {({ field, form }: CustomFieldProps) => (
                                <FormControl mb={'3'} isRequired isInvalid={!!form.errors.email && !!form.touched.email}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input borderColor={'gray.500'} rounded={'none'} {...field} placeholder='abraham@gmail.com' />
                                    <FormErrorMessage>{form.errors.email as string}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='phone'>
                            {({ field, form }: CustomFieldProps) => (
                                <FormControl mb={'3'} isRequired isInvalid={!!form.errors.phone && !!form.touched.phone}>
                                    <FormLabel>Phone</FormLabel>
                                    <Input borderColor={'gray.500'} rounded={'none'} {...field} placeholder='Phone number' />
                                    <FormErrorMessage>{form.errors.phone as string}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='message'>
                            {({ field, form }: CustomFieldProps2) => (
                                <FormControl isRequired isInvalid={!!form.errors.message && !!form.touched.message}>
                                    <FormLabel>What can we help you with?</FormLabel>
                                    <Textarea borderColor={'gray.500'} rounded={'none'} rows={7} {...field} placeholder="I'm interested in buying, selling or a free consult with our agent" />
                                    <FormErrorMessage>{form.errors.message as string}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button rounded={'none'}
                            mt={4} w={'full'}
                            bg={'brand.primary'} color="white" _hover={{ bg: 'brand.primary' }}
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                        <FormControl>
                            <FormHelperText>
                                You're creating an account with Urbanspaces and agree to our <Text as={'span'} color={"blue.400"} mr={'1'}>Terms of use</Text> and <Text as={'span'} color={"blue.400"} ml={'1'}>Privacy Policy</Text>
                            </FormHelperText>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </Flex>
    )
}
