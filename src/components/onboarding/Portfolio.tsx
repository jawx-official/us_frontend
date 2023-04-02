import { StepsProps } from '@/data/steps.interface'
import { Box, Button, Flex, Image, Textarea, FormLabel, IconButton, useBreakpointValue, Input, Grid, GridItem } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone';
import * as Joi from "joi"


import styled from '@emotion/styled';
import { FiMinus, FiPlus, FiTrash, FiTrash2 } from 'react-icons/fi';
import users from '@/apis/users';
import { MediaInterface, PortfolioInterface } from '@/data/portfolio';


const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 70px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  cursor: pointer;
  transition: border .24s ease-in-out;
`;

interface PortfolioRequest {
    content: string[]
}

enum ContentAction {
    ADD,
    REMOVE,
    CLEAR
}

interface FilePreview extends File {
    preview: string;
    prior?: boolean;
    id?: string;
}


export default function Portfolio({ disabled, prevFn, nextFn }: StepsProps) {
    const [request, setRequest] = useState<PortfolioRequest>({
        content: []
    })
    const [files, setFiles] = useState<FilePreview[]>([]);
    const [progress, setProgress] = useState<boolean>(false);

    const fetchMyPortfolio = async function () {
        const { data: { code, message, data } } = await users.fetchMyPortfolio();
        if (code === 200 && data) {
            setRequest({
                ...request,
                content: [...data.embeddedMedia]
            })
            setFiles([...data.gallery.map((media: MediaInterface) => {
                return {
                    preview: media.url,
                    name: media._id,
                    id: media._id,
                    prior: true
                }
            })])
        }
    }

    const updateContentItem = useCallback((value: string, index: number) => {
        let copy = { ...request };
        copy.content[index] = value;
        setRequest(copy)
    }, [request, setRequest])

    const modifyContent = (action: ContentAction, index: number) => {
        if (action === ContentAction.ADD) {
            let copy = { ...request };
            let lastItem = copy.content[index];
            if (lastItem === undefined || (lastItem.length > 20 && lastItem.startsWith('<iframe'))) {
                copy.content.push("");
                setRequest(copy);
            }
        }
        if (action === ContentAction.REMOVE) {
            let copy = { ...request };
            copy.content.splice(index, 1);
            setRequest(copy);
        }

        if (action === ContentAction.CLEAR) {
            let copy = { ...request };
            copy.content[index] = "";
            setRequest(copy);
        }
    }
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const newFiles: FilePreview[] = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }, []);

    const removeFile = async (fileIndex: number) => {
        const newFiles = [...files];
        if (newFiles[fileIndex].prior) {
            await users.deletePortfolioMedia(newFiles[fileIndex].name)
            await fetchMyPortfolio()
        } else {
            newFiles.splice(fileIndex, 1);
            setFiles((prevFiles) => [...newFiles]);
        }
    };

    useEffect(() => {
        fetchMyPortfolio()
    }, [])

    const filePreviews = files.map((file, index) => (
        <GridItem key={"image_" + index} colSpan={2}>
            <Box my={2} rounded={'lg'} h={"150px"} w={"100%"} key={file.name}>
                <Image rounded={'lg'} h={"100px"} width={'100%'} src={file.preview} alt={file.name} />
                {files.length > 1 && <IconButton mt={2} onClick={() => {
                    removeFile(index)
                }} p={0} color={'brand.darker'} fontWeight={'extrabold'} rounded={'full'} aria-label='add content' title='Remove image' icon={<FiMinus fontWeight={'extrabold'} />}></IconButton>}
            </Box>
        </GridItem>

    ));

    const { getRootProps, getInputProps, isFocused,
        isDragAccept,
        isDragReject } = useDropzone({
            onDrop, accept: {
                'image/png': ['.png'],
                'image/jpg': ['.jpg'],
                'image/jpeg': ['.jpeg'],
                'image/webp': ['.webp'],
            }
        });


    const submitPortfolio = async function () {
        const schema = Joi.object().keys({
            content: Joi.array().items(Joi.string()).min(1),
            photos: Joi.array().items(Joi.object().unknown(true)).min(1).max(10),
        })
        const validity = schema.validate({ content: request.content.filter(e => e.startsWith('<iframe')), photos: files });

        if (validity.error) {
            return;
        }
        const formData = new FormData();
        let finalFiles = files.filter(e => !e.prior)
        let prioFiles = files.filter(e => e.prior)
        for (let file of finalFiles) {
            formData.append('portfolio_images', file);
        }
        formData.append("content", JSON.stringify(validity.value.content));
        formData.append("gallery", JSON.stringify(prioFiles.map(e => e.id)))
        setProgress(true)
        const { data: { code, message, data } } = await users.updateMyPortfolio(formData);
        if (code === 200 && data) {
            nextFn();
        }
        setProgress(false)
    }
    return (
        <Box mt={useBreakpointValue({
            base: '0px',
            lg: "30px",
        })} display={"flex"} justifyContent="center">
            <Box bg={'white'} p={5} borderRadius={5} w={useBreakpointValue({
                base: '100%',
                lg: "800px",
            })} minH={"300px"} >
                <FormLabel fontSize={"13px"} color={'gray.600'} htmlFor="portfolio">Share your photo gallery with potential organizers?</FormLabel>
                <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
                    <input id="portfolio" {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </Container>
                <Box mt={2}>

                    <Grid
                        templateColumns='repeat(12, 1fr)'
                        gap={2}
                    >
                        {filePreviews}
                    </Grid>

                </Box>
                <Box>
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                        <FormLabel fontSize={"13px"} color={'gray.600'} htmlFor="embed-content">Share embed urls to your music with potential organizers?</FormLabel>
                        <IconButton _hover={{ bg: 'yellow.300' }} onClick={() => {
                            modifyContent(ContentAction.ADD, 0)
                        }} bg={'brand.highlight'} color={'brand.darker'} fontWeight={'extrabold'} borderRadius={'100%'} aria-label='add content' title='add new content' icon={<FiPlus fontWeight={'extrabold'} />}></IconButton>
                    </Flex>

                    <Box my={3}>
                        <Flex flexDir={"column"} gap={3} p={2}>
                            {request.content.map((content, index) => {
                                return (
                                    <Flex key={index + '_content'} gap={2} alignItems={'center'}>
                                        <Flex flexDir={"column"} gap={2}>
                                            <IconButton _hover={{ bg: 'yellow.300' }} onClick={() => {
                                                modifyContent(ContentAction.REMOVE, index)
                                            }} p={0} bg={'brand.highlight'} color={'brand.darker'} fontWeight={'extrabold'} rounded={'lg'} aria-label='add content' title='add new content' icon={<FiMinus fontWeight={'extrabold'} />}></IconButton>
                                            <IconButton _hover={{ bg: 'yellow.300' }} onClick={() => {
                                                modifyContent(ContentAction.CLEAR, index)
                                            }} bg={'brand.highlight'} color={'brand.darker'} fontWeight={'extrabold'} rounded={'lg'} aria-label='add content' title='add new content' icon={<FiTrash2 fontWeight={'extrabold'} />}></IconButton>
                                        </Flex>

                                        {!content.startsWith("<iframe") && <Textarea rows={5} onChange={(e) => {
                                            updateContentItem(e.target.value, index)
                                        }} value={content}></Textarea>}
                                        {content.startsWith("<iframe") && <Box w={'100%'} rounded={'lg'} dangerouslySetInnerHTML={{ __html: content }} />}
                                    </Flex>
                                )
                            })}
                        </Flex>
                    </Box>

                </Box>
                <Flex mt={5} width="100%" justify="flex-end">
                    <Button
                        isDisabled={disabled}
                        mr={4} color={'gray.700'}
                        onClick={prevFn}
                        size="sm" _hover={{ bg: 'transparent' }} bg='transparent'
                        variant="ghost"
                    >
                        Previous
                    </Button>
                    <Button size="sm" isLoading={progress} _hover={{ bg: 'yellow.300' }} color='brand.darker' bg={'brand.highlight'} onClick={submitPortfolio}>
                        Save and continue
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}
