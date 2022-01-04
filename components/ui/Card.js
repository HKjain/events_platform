import React from 'react';
import Link from 'next/link';

import events from '../../public/images/events.jpg';
import Image from 'next/image';
import CollegeIcon from '../icons/CollegeIcon';

function Card({ event }) {
  return (
    <>
      <div className="flex px-3 snap-center text-indigo-600 transition-all duration-500 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-3xl shadow-xl flex-col overflow-hidden justify-start items-center border-2 border-base-200 carousel-item bg-base rounded-2xl w-52">
        {/* image */}
        <div className="m-3 w-full rounded-md shadow-xl overflow-hidden flex-1 relative">
          <Image src={events} layout="fill" objectFit="cover" />
        </div>

        {/* Details */}
        <div className="w-full flex flex-col my-4 px-2">
          <h2 className="font-montserrat text-center uppercase">
            {event.eventName}
          </h2>
          <h2 className="flex space-x-1 space-y-2 font-montserrat items-center text-xs font-thin">
            <span>
              <CollegeIcon className="h-5 w-5" />
            </span>
            <span>{event.institute_name}</span>
          </h2>
          <Link href={`/events/${event._id}`}>
            <a className="btn border-0 opacity-100 font-bold text-xs btn-sm mt-2 hover:bg-indigo-400 bg-indigo-500 text-white rounded-lg">
              Know More &rarr;
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
