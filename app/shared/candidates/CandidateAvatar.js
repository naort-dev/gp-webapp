import React from 'react';
import Image from 'next/image';
import { candidateColor } from '/helpers/candidateHelper';
import { RxPerson } from 'react-icons/rx';

export default function CandidateAvatar({
  candidate,
  priority = false,
  small,
}) {
  const { firstName, lastName, image } = candidate;
  // const brightColor = candidateColor(candidate);

  return (
    <div className="relative ">
      <div
        className={`relative ${
          small ? 'h-20 w-20 lg:h-40 lg:w-40' : 'h-36 w-36 lg:h-80 lg:w-80'
        } rounded-full bg-zinc-300 text-white flex items-center justify-center`}
        // style={{ borderColor: brightColor }}
      >
        {image ? (
          <Image
            src={image}
            fill
            alt={`${firstName} ${lastName}`}
            data-cy="candidate-img"
            // style={{ borderColor: brightColor }}
            priority={priority}
            className="object-cover object-top rounded-full"
          />
        ) : (
          <RxPerson className="text-5xl lg:text-9xl" />
        )}
      </div>
    </div>
  );
}
