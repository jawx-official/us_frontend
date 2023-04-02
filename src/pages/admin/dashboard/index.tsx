import React, { ReactElement, useEffect, useState } from 'react'
import Layout from "@/layouts/admin-layout"
import { Box, Button, Icon, CircularProgress, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import admin from '@/apis/admin'
import { User } from '@/data/auth'
import { useAdminStore } from '@/store/admin'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import PageMetaComponent from '@/hooks/usePageMeta'

interface PageData {
    progress?: boolean;
}
const Dashboard = () => {
    const [data, setData] = useState<PageData>({
    });

    const { loadArtistApprovals, approvals, totalPages, currentPage } = useAdminStore()
    const fetchApprovals = async (page?: number) => {
        try {
            setData((prev) => ({ ...prev, progress: true }))
            await loadArtistApprovals(page);
            setData((prev) => ({ ...prev, progress: false }))
        } catch (error) {
            setData((prev) => ({ ...prev, progress: false }))
        }
    }

    useEffect(() => {
        fetchApprovals()
    }, [])
    return (
        <Box>
            <PageMetaComponent title='Stage Seekers - Approvals' description='Bringing stage performers and event organizers in a comprehensive marketplace' />
            <Box display={'flex'} justifyContent={'space-between'} pr={'10'} pl={'6'} mb={'3'}>
                <Text fontWeight={'extrabold'} fontSize={'2xl'}>Pending artist approvals</Text>
                <Box display={'flex'} gap={2}>
                    <Button onClick={() => fetchApprovals((currentPage - 1))} isDisabled={currentPage === 1}>
                        <Icon as={FiChevronLeft} />
                    </Button>
                    <Button onClick={() => fetchApprovals((currentPage + 1))} isDisabled={currentPage === totalPages || totalPages === 0}>
                        <Icon as={FiChevronRight} />
                    </Button>
                    <Box w={'5'}>
                        {data.progress && <CircularProgress isIndeterminate size={8} color='green.300' />}
                    </Box>
                </Box>
            </Box>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Artist name</Th>
                            <Th>Country</Th>
                            <Th isNumeric></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {approvals.map(user => <Tr key={user._id}>
                            <Td>{user.name}</Td>
                            <Td>{user.country}</Td>
                            <Td isNumeric>
                                <Button as={'a'} href={'/admin/dashboard/approvals/' + user._id}>Review</Button>
                            </Td>
                        </Tr>)}

                        {approvals.length === 0 && <Tr>
                            <Td colSpan={3}>
                                <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                                    No pending approvals were found.
                                </Box>
                            </Td>
                        </Tr>}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Dashboard;
