'use client'
import Layout from "@/layouts/admin-auth-layout"
import { ReactElement } from 'react'
import PageMetaComponent from '@/hooks/usePageMeta'
import ResetPassword from "@/components/forms/ResetPassword"
import { useRouter } from "next/router"

const ResetPasswordAdmin = function () {
    const router = useRouter()
    return (
        <>
            <PageMetaComponent title='Stage Seekers - Admin' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            <ResetPassword switchScreens={(screen) => router.push("/admin/auth/" + (screen === "login" ? "" : screen))} />
        </>
    )
}

ResetPasswordAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default ResetPasswordAdmin;
