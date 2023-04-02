import users from '@/apis/users'
import { useAuthStore } from '@/store/auth'
import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function UpdateAppActionTray() {
    const { user, setUser } = useAuthStore()
    const [progress, setProgress] = useState<boolean>(false);
    const markResolved = async () => {
        if (user) {
            setProgress(true)
            const { data: { code, data } } = await users.replyApplicationReview({
                comment: user.review?.comment || "",
                lastReviewed: "artist",
                reviewType: "response"
            })
            if (code === 200) {
                setUser(data.artist)
                window.location.href = "/"
            }
            setProgress(false)
        }
    }
    return (
        <div>
            <Text fontSize={"14px"} fontWeight={'extrabold'}>Admin's comment on your application</Text>
            <Box fontSize={"12px"} w={'100%'} mt={3} dangerouslySetInnerHTML={{ __html: user?.review?.comment || "" }} />

            <Button onClick={markResolved} isLoading={progress} mt={3} size="sm" _hover={{ bg: 'yellow.300' }} color='brand.darker' bg={'brand.highlight'}>Mark as resolved</Button>
        </div>
    )
}
