import Onboard from '@/components/onboarding';
import { useAuthStore } from '@/store/auth';
import Layout from "../layouts/default"
import React, { ReactElement } from 'react'

function updateApplication() {
    const { access, user } = useAuthStore()


    return (
        <div className=''>
            <Onboard hideLogout={true} />
        </div>
    )
}


updateApplication.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default updateApplication;
