import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import Carousel from './Carousel';


interface FilePreview {
    name: string;
    preview: string;
    prior?: boolean;
    id?: string;
}
export default function PortfolioPreview({ files, media }: { files: FilePreview[], media: string[] }) {
    const width = useBreakpointValue({ base: 'full', md: '700px' });
    return (
        <Box>
            <Text fontWeight={'extrabold'} fontSize={'xl'}>
                Gallery
            </Text>
            <Box mb={10} width={width} mt={2}>
                <Carousel cards={files.map(e => e.preview)} />
            </Box>

            <Text fontWeight={'extrabold'} fontSize={'xl'}>
                Embedded media
            </Text>
            <Box width={width} my={3}>
                <Flex flexDir={"column"} gap={3}>
                    {media.map((content, index) => {
                        return (
                            <Flex key={index + '_content'} gap={2} alignItems={'center'}>
                                {content.startsWith("<iframe") && <Box w={'100%'} rounded={'lg'} dangerouslySetInnerHTML={{ __html: content }} />}
                            </Flex>
                        )
                    })}
                </Flex>
            </Box>
        </Box>
    )
}
