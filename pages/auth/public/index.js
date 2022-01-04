import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import Dashboard from '../../../components/auth/Dashboard';
import Profile from '../../../components/auth/public/Profile';
import RegisteredEvents from '../../../components/auth/public/RegisteredEvents';

function PublicAuthHome({ profile, institutes }) {
  let first_name = profile.first_name;
  let last_name = profile.last_name;

  first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
  last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

  const userName = `${first_name} ${last_name}`;

  const menuItems = [
    {
      id: 1,
      name: 'Profile',
      slug: 'profile',
      component: <Profile profile={profile} institutes={institutes} />,
    },
    {
      id: 2,
      name: 'Registered Events',
      slug: 'registered_events',
      component: <RegisteredEvents />,
    },
  ];

  return (
    <div>
      <Head>
        <title>{`Welcome!, ${userName}`}</title>
      </Head>
      <Dashboard menuItems={menuItems} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const logged = session.user.name;

  const profile = {
    first_name: logged.first_name,
    last_name: logged.last_name,
    email: logged.email,
    contact: logged.contact ? logged.contact : null,
    gender: logged.gender ? logged.gender : null,
    dob: logged.dob ? logged.dob : null,
    state: logged.state ? logged.state : null,
    linkedIn: logged.linkedIn ? logged.linkedIn : null,
    github: logged.github ? logged.github : null,
    address: logged.address ? logged.address : null,
    institute: logged.institute ? logged.institute : null,
    iEmail: logged.iEmail ? logged.iEmail : null,
    degree: logged.degree ? logged.degree : null,
    semester: logged.semester ? logged.semester : null,
    registerNumber: logged.registerNumber ? logged.registerNumber : null,
  };

  const response = await fetch(`${process.env.base_url}/api/institutes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  const institutes = data.institutes;

  return {
    props: { session, profile, institutes },
  };
}
export default PublicAuthHome;
