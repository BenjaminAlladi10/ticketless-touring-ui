import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMonument, getTotals } from '@/store/cartSlice';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";

export default function MonumentCard({ monument }) {
  const { name, image, location, price } = monument;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleClick = () => {
    const item = { ...monument, quantity };
    dispatch(addMonument(item));
    dispatch(getTotals());
    toast.success(`Added ${item.quantity} item(s) to Cart`);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="w-[16rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500 hover:scale-[1.05] transition-transform">
      <img className="rounded-[1.2rem] h-44 p-2 mx-auto min-w-[98%] object-cover" src={image} alt={name} />
    
      <div className="p-3 pt-0 text-nowrap overflow-clip">
        <h6 className="mb-1 text-xl font-bold tracking-tight text-black dark:text-white truncate">{name}</h6>
      
        <p className="mb-1 font-normal text-[0.95rem] text-gray-700 dark:text-gray-300">
          <span className='text-gray-800 dark:text-gray-300 font-semibold'>Location:</span> {location}
        </p>

        <p className="mb-1 font-normal text-[0.95rem] text-gray-700 dark:text-gray-300">
          <span className='text-gray-800 dark:text-gray-300 font-semibold'>Price:</span> ₹{price}
        </p>

        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Tickets:</label>
          <select 
            onChange={handleQuantityChange} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {[...Array(10)].map((_, i) => (
              <option value={i + 1} key={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <Button 
          className="w-full"
          onClick={handleClick}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
