import { useAuthStore } from '@/store/auth'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import ActionTray from '../Actions/ActionTray'
import ForgotPassword from '../forms/ForgotPassword'
import Login from '../forms/Login'
import Register from '../forms/Register'
import ResetPassword from '../forms/ResetPassword'
import VerifyAccount from '../forms/VerifyAccount'

interface RightSideProps {
    defaultScreen: string;
    isModal?: boolean;
    closeModal?: () => void
}
export default function LayoutRightSide({ defaultScreen, isModal, closeModal }: RightSideProps) {
    const [current, setCurrent] = useState(defaultScreen)
    const { access } = useAuthStore()
    const setCurrentFunction = function (val: string) {
        setCurrent(val);
    }

    const renderConditionally = function () {
        if (access && access.granted) {
            if (isModal && closeModal) {
                closeModal()
            }
            return <ActionTray />
        }
        switch (current) {
            case "register":
                return <Register switchScreens={setCurrentFunction} />
            case "verify-account":
                return <VerifyAccount switchScreens={setCurrentFunction} />
            case "login":
                return <Login switchScreens={setCurrentFunction} />
            case "forgot-password":
                return <ForgotPassword switchScreens={setCurrentFunction} />
            case "reset-password":
                return <ResetPassword switchScreens={setCurrentFunction} />
            default:
                break;
        }
    }

    return <Box width={"100%"} color={"white"}>
        {renderConditionally()}
    </Box>
}
