'use client'
import Layout from "@/layouts/admin-auth-layout"
import { ReactElement } from 'react'
import PageMetaComponent from '@/hooks/usePageMeta'
import Login from "@/components/forms/Login"
import { useRouter } from "next/router"

const LoginAdmin = function () {
    const router = useRouter()
    return (
        <>
            <PageMetaComponent title='Stage Seekers - Admin' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            <Login admin={true} switchScreens={(screen) => router.push("/admin/auth/" + screen)} hideRegister={true} />
        </>
    )
}

LoginAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default LoginAdmin;
