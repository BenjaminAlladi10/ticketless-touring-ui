import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMonument, getTotals } from '@/store/cartSlice';
import { toast } from 'react-toastify';
import { MapPin, IndianRupee, ShoppingCart, Info } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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

  const handleQuantityChange = (val) => {
    setQuantity(parseInt(val));
  };

  return (
    <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={name}
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-semibold backdrop-blur-md bg-background/80">
            <IndianRupee className="w-3 h-3 mr-0.5" />
            {price}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-2 py-0">
        <CardTitle className="text-lg font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </CardHeader>

      <CardContent className="p-2 py-0">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Num. of Tickets</label>
            <Select onValueChange={handleQuantityChange} defaultValue="1">
              <SelectTrigger className="w-[70px] h-8 text-xs">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem value={(i + 1).toString()} key={i + 1}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-2 py-0 gap-2">
        <Button
          className="flex-1 gap-2 shadow-sm"
          onClick={handleClick}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
