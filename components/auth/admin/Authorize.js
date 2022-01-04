import React from 'react';
import InstitutesList from './InstitutesList';

function Authorize() {
  const institutes = [
    {
      id: '1',
      instituteName: 'National Institute of Technology Karnataka',
      email: 'harshkawadia204ca012@nitk.edu.in',
      isActive: true,
    },
    {
      id: '2',
      instituteName: 'National Institute of Technology Jamshedpur',
      email: 'harshkawadia204ca012@nitj.edu.in',
      isActive: false,
    },
    {
      id: '3',
      instituteName: 'National Institute of Technology Calicut',
      email: 'harshkawadia204ca012@nitc.edu.in',
      isActive: false,
    },
  ];
  return (
    <div className="p-3 rounded-lg">
      <div className=" bg-white border-red-500 h-96 sm:h-[75vh] overflow-scroll shadow-2xl sm:w-[96%] mx-auto divide-indigo-700 p-3 text-gray-900 rounded-lg">
        <h1 className=" sticky left-0 bg-white uppercase text-center text-gray-800 font-montserrat">
          Registered Institutes
        </h1>
        <InstitutesList institutes={institutes} />
      </div>
    </div>
  );
}

export default Authorize;
