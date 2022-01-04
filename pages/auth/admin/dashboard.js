import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Loading from '../../../components/ui/Loading';
import Authorize from '../../../components/auth/admin/Authorize';
import Dashboard from '../../../components/auth/Dashboard';

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const check = localStorage.getItem('isAdmin');
    if (!check) router.replace('/auth/admin');
    else setIsLoading(false);
  }, [router]);

  const menuItems = [
    {
      id: 1,
      name: 'Authorize Institutes',
      slug: 'institute_auth',
      component: <Authorize />,
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Welcome to Admin Panel</title>
      </Head>
      <Dashboard menuItems={menuItems} />
    </>
  );
}

export default AdminDashboard;
