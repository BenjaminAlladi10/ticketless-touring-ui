import React, {useEffect} from 'react';
import MonumentCard from './MonumentCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonuments } from '../store/monumentsSlice';

import ShimmerContainer from './ShimmerContainer';

export default function Body() {

  const monumentsState= useSelector((state)=> state.monuments);
  const {monuments, status, error}= monumentsState;

  const dispatch= useDispatch();
  useEffect(()=>{
      if(status==="idle")
      {
        dispatch(fetchMonuments());
      }
  },[]);

  if(status==="failed")
  {
    return (
      <div className="flex justify-center items-center">
          <span className="ml-1 text-lg text-gray-600 dark:text-white">Error: {error.message}</span>
      </div>
    )
  }

  return status==="loading" || status==="pending"? (
    <div className="flex justify-center items-center">
          <ShimmerContainer/>
    </div>
  ):(
    <div className="w-[75%] mx-auto flex md:flex-row mt-8 mb-8 md:gap-x-4 flex-wrap justify-evenly gap-y-8 sm:flex-col sm:items-center">
        { monuments?.length>0 &&
          monuments.map((monument)=>
            <MonumentCard monument={monument} key={monument._id}/>
          )
        }
    </div>
  )
};
