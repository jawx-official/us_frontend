import React from 'react';
import { Box, Flex, IconButton, Text, Icon, useBreakpointValue } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';

// Settings for the slider
const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: false,
    speed: 100,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function GalleryCarouselMini({ cards }: { cards: string[] }) {
    // As we have used custom buttons, we need a reference variable to
    // change the state
    const [slider, setSlider] = React.useState<Slider | null>(null);

    // These are the images used in the slide

    return (
        <Box
            position={'relative'}
            height={'230px'}
            roundedTop={'md'}
            overflow={'hidden'}>
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards.map((url, index) => (
                    <Box
                        key={index}
                        height={'2xl'}
                        position="relative"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundImage={`url(${url})`}
                    >
                        <Flex flexDir={'column'} justifyContent={'space-between'} alignItems={'center'} h={'230px'}>
                            <Box></Box>
                            <Flex gap={2} justifyContent={'center'} roundedTop={'xl'} w={"100px"} h={"60px"} py={2} bg="gray.300">
                                <IconButton rounded={'full'} bg={'brand.darker'} _hover={{ bg: 'brand.dark' }} h={8} size={'xs'} w={8} border={'brand.darker'} icon={<Icon fill={'white'} border={'white'} fontSize={'xl'} as={FiHeart} />} aria-label={'like-button'} />
                                <IconButton rounded={'full'} bg={'brand.darker'} _hover={{ bg: 'brand.dark' }} h={8} size={'xs'} w={8} border={'brand.darker'} icon={<Icon fill={'white'} border={'white'} fontSize={'xl'} as={FiMessageSquare} />} aria-label={'message-button'} />
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}