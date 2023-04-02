'use client'
import Layout from "@/layouts/admin-auth-layout"
import { ReactElement } from 'react'
import PageMetaComponent from '@/hooks/usePageMeta'
import ForgotPassword from "@/components/forms/ForgotPassword"
import { useRouter } from "next/router"

const ForgotPasswordAdmin = function () {
    const router = useRouter()
    return (
        <>
            <PageMetaComponent title='Stage Seekers - Admin' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            <ForgotPassword switchScreens={(screen) => router.push("/admin/auth/" + (screen === "login" ? "" : screen))} />
        </>
    )
}

ForgotPasswordAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default ForgotPasswordAdmin;
