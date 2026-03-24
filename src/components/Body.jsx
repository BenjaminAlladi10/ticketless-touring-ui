import React from 'react';
import MonumentCard from '@/components/MonumentCard';
import { useMonuments } from '@/hooks/useMonuments';
import ShimmerContainer from '@/components/ShimmerContainer';

export default function Body() {
  const { data: monuments, isLoading, isError, error } = useMonuments();

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <span className="ml-1 text-lg text-gray-600 dark:text-white">Error: {error.message}</span>
      </div>
    );
  }

  return isLoading ? (
    <div className="flex justify-center items-center">
      <ShimmerContainer />
    </div>
  ) : (
    <div className="w-[75%] mx-auto flex md:flex-row mt-8 mb-8 md:gap-x-4 flex-wrap justify-evenly gap-y-8 sm:flex-col sm:items-center">
      {monuments?.length > 0 &&
        monuments.map((monument) => (
          <MonumentCard monument={monument} key={monument._id} />
        ))}
    </div>
  );
}
