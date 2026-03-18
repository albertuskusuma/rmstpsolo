import React, { useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { getAccessToken } from '../../auth/auth';

const DashboardPage = () => {

    useEffect(() => {
        const fetchData = async () => {
            const token = getAccessToken();
            if (!token) return;
        };

        fetchData();
    }, []);

    return (
        <MainLayout>
            <div>
                <h2 className='text-2xl font-semibold p-6'>Dashboard</h2>
            </div>
        </MainLayout>
    )
}

export default DashboardPage