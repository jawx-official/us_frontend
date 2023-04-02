import React, { ReactElement, useEffect, useState } from 'react'
import Layout from "@/layouts/admin-layout"
import { useAdminStore } from '@/store/admin'
import { GetServerSideProps } from 'next'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Box, Button, Flex, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue } from '@chakra-ui/react';
import CalendarPreview from '@/components/admin/application/CalendarPreview';
import PortfolioPreview from '@/components/admin/application/PortfolioPreview';
import PersonalDetailsPreview from '@/components/admin/application/PersonalDetailsPreview';
import PageMetaComponent from '@/hooks/usePageMeta';

interface PageData {
    progress?: boolean;
    reviewType: string;
}

const ViewApplication = ({ id }: { id: string }) => {
    const { loadArtistApplication, submitArtistReview, application } = useAdminStore()
    const [data, setData] = useState<PageData>({
        reviewType: "comment"
    });
    const width = useBreakpointValue({ base: '100%', md: 'xl' });
    const { quill, quillRef } = useQuill({
        placeholder: "Leave a comment",

        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ align: [] }],

                [{ color: [] }],
                [{ list: 'bullet' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['link'],
            ],
            clipboard: {
                matchVisual: false,
            },
        },
        formats: [
            'bold', 'italic', 'underline', 'strike',
            'align', 'list',
            'size', 'header',
            'link',
            'color',
        ],
    });
    const fetchApplication = async (id: string) => {
        try {
            setData((prev) => ({ ...prev, progress: true }))
            await loadArtistApplication(id);
            setData((prev) => ({ ...prev, progress: false }))
        } catch (error) {
            setData((prev) => ({ ...prev, progress: false }))
        }
    }

    const submitReview = async function () {
        if (application && application.artist && quill) {
            setData((prev) => ({ ...prev, progress: true }))
            await submitArtistReview({
                artistId: application?.artist._id,
                review: {
                    comment: quill.root.innerHTML,
                    reviewType: data.reviewType,
                    lastReviewed: "admin"
                }
            });
            setData((prev) => ({ ...prev, progress: false }))
        }
    }
    useEffect(() => {
        if (id) {
            fetchApplication(id);
        }
    }, [id])
    return (
        <div>
            <PageMetaComponent title={`Stage Seekers - Approve ${application?.artist?.name}`} description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            <Flex px={'10px'} justifyContent={'end'}>
                <Box>
                    <Popover placement='bottom-start'>
                        <PopoverTrigger>
                            <Button onClick={() => {
                                setTimeout(() => {
                                    if (quill) {
                                        quill.root.innerHTML = application?.artist?.review?.comment || "";
                                        setData((prev) => ({ ...prev, reviewType: "approve" }))
                                    }
                                }, 300)
                            }}>Review</Button>
                        </PopoverTrigger>
                        <PopoverContent w={width}>
                            <PopoverBody p={0}>
                                <Box minH={'200px'}>
                                    <Flex py={2} px={3} borderBottom={'1px'} borderColor={'gray.400'} pb={'2'} mb={'2'} justifyContent={'space-between'}>
                                        <Text fontWeight={'bold'} fontSize={'14px'} letterSpacing={'tight'}>Complete your review</Text>
                                        <PopoverCloseButton />
                                    </Flex>
                                    <Box px={3} w={'100%'}>
                                        <Box roundedBottom={'lg'} ref={quillRef}></Box>
                                    </Box>
                                    <Box px={3}>
                                        <RadioGroup onChange={(val) => {
                                            setData((prev) => ({ ...prev, reviewType: val }))
                                        }} mt={'5'} defaultValue={data.reviewType}>
                                            <Flex flexDir={'column'} gap={3}>
                                                <Radio size='md' value='comment' display={'flex'} alignItems={'flex-start'} colorScheme='blue'>
                                                    <Flex mt={'-1.5'} flexDir={'column'}>
                                                        <Text fontWeight={'bold'} fontSize={'14px'}>Comment</Text>
                                                        <Text fontSize={'13px'} mt={'-1'}>post a comment for the artist</Text>
                                                    </Flex>
                                                </Radio>
                                                <Radio size='md' value='approve' display={'flex'} alignItems={'flex-start'} colorScheme='blue'>
                                                    <Flex flexDir={'column'} mt={'-1.5'}>
                                                        <Text fontWeight={'bold'} fontSize={'14px'}>Approve</Text>
                                                        <Text fontSize={'13px'} mt={'-1'}>Approve this artist's profile</Text>
                                                    </Flex>
                                                </Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </Box>
                                    <Flex px={3} py={2} mt={3} borderTop={'1px'} borderColor={'gray.400'} alignItems={'center'} justifyContent={'flex-start'}>
                                        <Button isLoading={data.progress} onClick={submitReview} fontSize={'14px'} fontWeight={'bold'} size={'sm'}>Submit review</Button>
                                    </Flex>
                                </Box>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
            </Flex>
            <Tabs>
                <TabList>
                    <Tab>Personal Details</Tab>
                    <Tab>Portfolio</Tab>
                    <Tab>Availability</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <PersonalDetailsPreview genres={application?.artist?.genres || []} bio={application?.artist?.bio || ""} />
                    </TabPanel>
                    <TabPanel>
                        <PortfolioPreview media={application?.portfolio?.embeddedMedia || []} files={application?.portfolio?.gallery.map(media => ({ preview: media.url, name: media.aws_id, prior: true, id: media.aws_id })) || []} />
                    </TabPanel>
                    <TabPanel>
                        <CalendarPreview calendarSlots={application?.availability?.available || []} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}



ViewApplication.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async function (ctx) {
    // keep the data on the store so all child components for this page can get the data.


    return {
        props: {
            ...ctx.params
        }
    };
}
export default ViewApplication;