'use client'
import Layout from "@/layouts/profile-layout"
import { ReactElement, useCallback, useEffect, useState } from 'react'
import PageMetaComponent from '@/hooks/usePageMeta'
import { useGeneralStore } from "@/store/general"
import { Avatar, Badge, Box, Icon, Button, CircularProgress, Flex, Grid, GridItem, Text, useBreakpointValue, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, IconButton, Progress } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiHeart, FiMapPin, FiMessageSquare, FiStar } from "react-icons/fi"
import { FaUserClock } from "react-icons/fa"
import Previews from "@/components/artists/Previews"
import moment from "moment"

const ProfileView = function () {
    const { loadSingleArtist, artistInfo, progress } = useGeneralStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ratingsDistribution, setRatingsDistribution] = useState<number[]>([])
    const [groupRatingsDistribution, setGroupRatingsDistribution] = useState<number[]>([])
    const responsiveSpan = useBreakpointValue({ base: 12, md: 12, lg: 6, xl: 6 })
    const responsiveWidth = useBreakpointValue({ base: "full", md: "w-1/2" })
    const router = useRouter()
    const reloadPage = useCallback(async function (id: string) {
        setIsLoading(true);
        await loadSingleArtist(id)
        setIsLoading(false)
    }, [])
    useEffect(() => {
        if (router.query.id) { reloadPage(router.query.id as string) }
    }, [router.query.id])

    useEffect(() => {
        if (artistInfo && artistInfo.latestReviews) {
            setRatingsDistribution(new Array(5).fill(0).map((val, index) => {
                let count = artistInfo.latestReviews.filter(e => e.rating === index).length
                if (artistInfo.latestReviews.length === 0) {
                    return 0;
                }
                return (count / artistInfo.latestReviews.length) * 100
            }))

            setGroupRatingsDistribution(new Array(3).fill(0).map((val, index) => {
                let count = artistInfo.latestReviews.reduce((sum, curr) => {
                    if (curr) {
                        switch (index) {
                            case 0:
                                sum += curr.response_rate;
                                break;
                            case 1:
                                sum += curr.approachability;
                                break;
                            case 2:
                                sum += curr.professionalism;
                                break;
                            default:
                                break;
                        }
                    }
                    return sum;
                }, 0)

                return count
            }))
        }
    }, [artistInfo])
    return (
        <>
            <PageMetaComponent title='Stage Seekers - Artist profile' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            {isLoading && <Flex h={"400px"} w={'full'} justifyContent={'center'} alignItems={'center'}>
                <CircularProgress ml={4} isIndeterminate size={8} color='brand.highlight' />
            </Flex>}
            {!isLoading && <Box rounded={'md'} border={'1px'} p={8} borderColor="#4E73C5" minH={'100vh'} w={'full'}>
                <Grid
                    templateColumns='repeat(12, 1fr)'
                    gap={5}
                >
                    <GridItem colSpan={responsiveSpan}>
                        <Box>
                            <Flex flexDir={'row'} gap={8}>
                                <Avatar src={artistInfo ? artistInfo.artist?.avatar : ''} border={'1px'} borderColor={'brand.highlight'} h={'32'} w={'32'} />
                                <Flex py={5} color={'gray.300'} justifyContent={'space-between'} flexDir={'column'}>
                                    <Box>
                                        <Text fontSize={'3xl'} fontWeight={'bold'} textTransform={'capitalize'}>{artistInfo?.artist?.name}</Text>
                                        <Text fontSize={'md'} textTransform={'capitalize'}>{artistInfo?.artist?.genres[0]}</Text>
                                    </Box>
                                    <Box>
                                        <Popover trigger='hover'>
                                            <PopoverTrigger>
                                                <Flex gap={1} alignItems={'center'}>
                                                    {
                                                        new Array(5).fill(0).map((lev, index) => {
                                                            return <Icon key={'rating_' + index} color={'gray.300'} fill={artistInfo && artistInfo.averageRating > index ? 'brand.highlight' : 'transparent'} stroke={artistInfo && artistInfo.averageRating > index ? 'brand.highlight' : 'gray.300'} as={FiStar} />
                                                        })
                                                    }
                                                </Flex>

                                            </PopoverTrigger>
                                            <PopoverContent color='white' bg='brand.darker' borderColor='gray.400'>
                                                <PopoverArrow bg='brand.darker' />
                                                <PopoverBody>
                                                    <Previews reviews={artistInfo ? artistInfo.latestReviews : []} />
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box mt={3}>
                            <Badge border={'1px'} borderColor={'brand.highlight'} bg={'transparent'} color={'gray.300'} rounded={'xl'} px={5} py={1}>
                                10 Followers
                            </Badge>
                        </Box>
                    </GridItem>
                    <GridItem px={{ base: 0, md: 8 }} colSpan={responsiveSpan}>
                        <Flex justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <IconButton rounded={'full'} bg={'brand.darker'} _hover={{ bg: 'brand.darker' }} h={8} size={'xs'} w={8} border={'brand.darker'} icon={<Icon fill={'white'} fontSize={'xl'} border={'white'} as={FiHeart} />} aria-label={'like-button'} />
                                <IconButton rounded={'full'} bg={'brand.darker'} _hover={{ bg: 'brand.darker' }} h={8} size={'xs'} w={8} border={'brand.darker'} icon={<Icon fill={'white'} fontSize={'xl'} border={'white'} as={FiMessageSquare} />} aria-label={'message-button'} />
                            </Flex>
                            <Box>
                                <Button rounded={'2xl'} size={'sm'} bg={'brand.highlight'} _hover={{ bg: 'yellow.300' }}>Book artist</Button>
                            </Box>
                        </Flex>
                        <Box rounded={'md'} mt={5} bg={'#1D2F59'} minH={'16'} p={3} w={'full'}>
                            <Flex justifyContent={'space-between'} color={'gray.300'}>
                                <Flex alignItems={'center'} gap={2}>
                                    <Icon as={FiMapPin} />
                                    <Text>From</Text>
                                </Flex>
                                <Text>{artistInfo?.artist?.country}</Text>
                            </Flex>
                            <Flex mt={3} justifyContent={'space-between'} color={'gray.300'}>
                                <Flex alignItems={'center'} gap={2}>
                                    <Icon as={FaUserClock} />
                                    <Text>Member since</Text>
                                </Flex>
                                <Text>{moment(artistInfo?.artist?.createdAt).format('MMM, YYYY')}</Text>
                            </Flex>
                        </Box>
                    </GridItem>
                </Grid>

                <Grid templateColumns='repeat(12, 1fr)'
                    gap={5} mt={5} rounded={'md'} border={'1px'} p={8} borderColor="#fff" minH={'200px'} w={'full'}>
                    <GridItem colSpan={responsiveSpan}>
                        <Box color={'gray.300'}>
                            <Text fontWeight={'bold'} fontSize={'2xl'}>Bio</Text>
                            <Text>
                                {artistInfo?.artist?.bio}
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={responsiveSpan}>
                        <Box color={'gray.300'}>
                            <Text fontWeight={'bold'} fontSize={'2xl'}>Availability</Text>

                        </Box>
                    </GridItem>
                </Grid>

                <Text mt={8} fontWeight={'bold'} color={'gray.400'} fontSize={'3xl'}>Portfolio</Text>
                <Grid templateColumns='repeat(12, 1fr)' py={3}
                    gap={3} rounded={'md'} minH={'200px'} w={'full'}>
                    {
                        artistInfo?.portfolio?.embeddedMedia.map((content, index) => {
                            return <GridItem key={'embedded_' + index} colSpan={{ base: 12, md: 4 }}>
                                <Box color={'gray.300'}>
                                    {content.startsWith("<iframe") && <Box w={'100%'} rounded={'lg'} dangerouslySetInnerHTML={{ __html: content }} />}
                                </Box>
                            </GridItem>
                        })
                    }
                </Grid>

                <Text mt={8} fontWeight={'bold'} color={'gray.400'} fontSize={'3xl'}>Ratings & reviews</Text>
                <Grid bg={'#1D2F59'} templateColumns='repeat(12, 1fr)' py={5} px={5}
                    gap={{ base: 5, md: 10 }} rounded={'md'} minH={'200px'} w={'full'}>
                    <GridItem p={5} rounded={'md'} bg={'brand.darker'} minH={'200px'} color={'gray.300'} colSpan={{ base: 12, md: 6 }}>
                        <Flex gap={1} alignItems={'center'}>
                            <Text mr={5} fontWeight={'bold'} fontSize={'2xl'}>Reviews</Text>
                            {
                                new Array(5).fill(0).map((lev, index) => {
                                    return <Icon key={'rating_' + index} color={'gray.300'} fill={artistInfo && artistInfo.averageRating > index ? 'brand.highlight' : 'transparent'} stroke={artistInfo && artistInfo.averageRating > index ? 'brand.highlight' : 'gray.300'} as={FiStar} />
                                })
                            }({artistInfo && artistInfo.averageRating})
                        </Flex>
                        <Flex flexDir={'column-reverse'}>
                            {
                                ratingsDistribution.map((percentage, index) => {
                                    return <Flex gap={3} alignItems={'center'} key={"dist_" + index}>
                                        <Box w={'20'}>
                                            <Text>{index + 1} Stars</Text>
                                        </Box>
                                        <Progress w={"full"} h={'1'} rounded={'xl'} colorScheme={'whatsapp'} value={percentage} />
                                        <Box w={'16'}>
                                            <Text>({percentage})</Text>
                                        </Box>
                                    </Flex>
                                })
                            }
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 6 }}>
                        <Box rounded={'md'} p={5} color={'gray.300'} bg={'brand.darker'} minH={'200px'}>
                            <Text mr={5} fontWeight={'bold'} fontSize={'2xl'}>Ratings breakdown</Text>
                            <Flex flexDir={'column'}>
                                {
                                    groupRatingsDistribution.map((percentage, index) => {
                                        return <Flex gap={3} justifyContent={'space-between'} alignItems={'center'} key={"dist_" + index}>
                                            <Box>
                                                <Text>
                                                    {
                                                        ["Artist response rate", "Artist Approachability", "Artist professionalism"][index]
                                                    }:
                                                </Text>
                                            </Box>
                                            <Flex alignItems={'center'} gap={2}>
                                                <Icon fill={'brand.highlight'} stroke={'brand.highlight'} as={FiStar} />
                                                <Text>({percentage})</Text>
                                            </Flex>
                                        </Flex>
                                    })
                                }
                            </Flex>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>}
        </>
    )
}

ProfileView.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default ProfileView;
