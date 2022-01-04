import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../../../components/ui/Loading';

function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleAdminLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email === 'harshkawadia8.hk@gmail.com' && password === 'hkjain123') {
      localStorage.setItem('isAdmin', true);
      router.replace('/auth/admin/dashboard');
    }
  };

  useEffect(() => {
    const check = localStorage.getItem('isAdmin');
    if (check) router.replace('/auth/admin/dashboard');
    else setIsLoading(false);
  }, [router]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="w-[85%] mx-auto mt-5">
        <h1 className="uppercase text-center font-montserrat">Admin Login</h1>
      </div>
      <div className="bg-white mx-auto w-[85%] sm:w-[65%] md:w-[45%] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="email"
            placeholder="Email address"
            ref={emailRef}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="*********"
            ref={passwordRef}
            minLength="6"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600 hover:scale-95 transition-all ease-in duration-100 text-white tracking-wider font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleAdminLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
