import { User } from '@/data/auth'
import { Review } from '@/data/general.interface';
import { Avatar, Box, Button, Icon, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import React from 'react'
import { FiStar } from 'react-icons/fi'
import Previews from './Previews';

export default function ArtistInfo({ artist, averageRating, latestReviews }: { artist: User, averageRating: number; latestReviews: Review[] }) {
    return (
        <Box rounded={'md'} bg={'transparent'} px={3} py={2}
            height={'70px'}>
            <Flex h={'full'} alignItems={'center'} justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'} justifyContent={'start'}>
                    <Avatar as={'a'} href={`/profile/${artist._id}`} src={artist.avatar} h={10} w={10} />
                    <Flex flexDir={'column'}>
                        <Flex gap={2} alignItems={'center'}>
                            <Text color={'gray.300'} fontWeight={'bold'}>{artist.name}</Text>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <Flex gap={1} alignItems={'center'}>
                                        <Icon color={'gray.300'} fill={averageRating > 0 ? 'brand.highlight' : 'transparent'} stroke={averageRating > 0 ? 'brand.highlight' : 'gray.300'} as={FiStar} />
                                        <Text color={'gray.300'}>
                                            {averageRating}
                                        </Text>
                                    </Flex>

                                </PopoverTrigger>
                                <PopoverContent color='white' bg='brand.darker' borderColor='gray.400'>
                                    <PopoverArrow bg='brand.darker' />
                                    <PopoverBody>
                                        <Previews reviews={latestReviews} />
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Flex>
                        <Flex><Text color={'gray.300'}>{artist.genres[0]}</Text></Flex>
                    </Flex>
                </Flex>
                <Button rounded={'2xl'} size={'sm'} bg={'brand.highlight'} _hover={{ bg: 'yellow.300' }}>Book me</Button>
            </Flex>
        </Box>
    )
}
