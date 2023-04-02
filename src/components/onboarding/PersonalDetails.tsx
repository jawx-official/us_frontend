import { StepsProps } from '@/data/steps.interface'
import { countries, Country } from '@/utils/countries';
import userApi from "@/apis/users"
import * as Joi from "joi"
import { Box, Button, Flex, FormLabel, Textarea, useBreakpointValue } from '@chakra-ui/react'
import { ChakraStylesConfig, Select, } from 'chakra-react-select';
import React, { useState } from 'react'
import { genres } from '@/utils/genres';
import { useAuthStore } from '@/store/auth';


export default function PersonalDetails({ disabled, prevFn, nextFn }: StepsProps) {
    const { user, setUser } = useAuthStore()
    const chakraStyles: ChakraStylesConfig = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            background: "transparent",
        }),
        container: (provided, state) => ({
            ...provided,
            color: 'gray.600',
            width: '100%'
        }),
        option: (provided, state) => ({
            ...provided,
            background: state.isFocused ? "gray.300" : "white",
            color: 'gray.600'
        }),
        menuList: (provided, state) => ({
            ...provided,
            background: "white",
            color: 'gray.600'
        }),
    };
    const [formData, setFormData] = useState<{ genres: string[]; bio: string; progress: boolean }>({
        genres: user?.genres || [],
        bio: user?.bio || "",
        progress: false,
    })
    const submitStep = async function () {
        const schema = Joi.object().keys({
            genres: Joi.array().items(Joi.string()).min(1),
            bio: Joi.string().required()
        })
        const validity = schema.validate({ genres: formData.genres, bio: formData.bio });
        if (validity.error) {
            return;
        }
        setFormData({ ...formData, progress: true })
        const { data: { code, message, data } } = await userApi.updateMyAccount({
            ...validity.value
        })
        if (code === 200 && data) {
            setUser(data)
            setFormData({ ...formData, progress: false })
            nextFn();
        }
    }


    return (
        <Box mt={useBreakpointValue({
            base: '0px',
            lg: "30px",
        })} display={"flex"} justifyContent="center">
            <Box bg={'white'} p={5} borderRadius={5} w={useBreakpointValue({
                base: '100%',
                lg: "800px",
            })} minH={"200px"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submitStep()
                }}>
                    <Box display={"flex"} gap={3} flexDir={"column"}>
                        <Box>
                            <FormLabel fontSize={"13px"} color={'gray.600'} htmlFor="password">What are your genres?</FormLabel>
                            <Select isMulti value={Object.values(genres).flat().filter(d => formData.genres.includes(d)).map(item => {
                                return {
                                    label: item,
                                    value: item
                                }
                            })} onChange={(value) => {
                                setFormData({ ...formData, genres: value.map((e: any) => e.label) })
                            }} selectedOptionStyle="check" chakraStyles={
                                chakraStyles
                            }
                                options={Object.values(genres).flat().map(item => {
                                    return {
                                        label: item,
                                        value: item
                                    }
                                })}
                            />
                        </Box>
                        <Box>
                            <FormLabel fontSize={"13px"} color={'gray.600'} htmlFor="email">Your biography</FormLabel>
                            <Textarea value={formData.bio} rows={8} onChange={(e) => {
                                setFormData({ ...formData, bio: e.target.value })
                            }} id='email' fontSize={"14px"} color={'gray.600'} placeholder='Biography' />
                        </Box>
                        <Flex width="100%" justify="flex-end">
                            <Button
                                isDisabled={disabled}
                                mr={4}
                                onClick={prevFn} color={'gray.700'}
                                size="sm" _hover={{ bg: 'transparent' }} bg='transparent'
                                variant="ghost"
                            >
                                Previous
                            </Button>
                            <Button isLoading={formData.progress} size="sm" type='submit' _hover={{ bg: 'yellow.300' }} color='brand.darker' bg={'brand.highlight'}>
                                Save and continue
                            </Button>
                        </Flex>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}
