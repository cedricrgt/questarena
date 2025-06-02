'use client';

import Image from 'next/image';

type ChallengeCardProps = {
  imageSrc: string;
  category: string;
  title: string;
  participants: number;
};

const ChallengeCard = ({ imageSrc, category, title, participants }: ChallengeCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm">
      <div className="relative h-40 w-full">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-1">
        <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{participants} participants</p>
      </div>
    </div>
  );
};

export default ChallengeCard;
