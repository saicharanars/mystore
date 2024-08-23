import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Button } from '../ui';
import Image from 'next/image';

const ProductCard = () => {
  return (
    <Card className=" rounded-none shadow-lg">
      <CardHeader className="p-0 w-full">
        <Image
          loading="lazy"
          alt="Mystore"
          title="Mystore"
          width={125}
          height={32}
          src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/657f4354a5ffb6e03b970264/whatsapp-image-2023-12-02-at-15-36-13-420x420.jpeg"
          className="h-auto mx-auto"
          ms-data-valign="middle"
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-start gap-2">
        <p className="  text-lg text-balance line-clamp-2 p-0">
          The BagMarket Decent school bag for Boys and girls Printed 34 Liter
          Boys and girls Boys and girls
        </p>
        <p className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
          bags
        </p>
        <div className="flex  justify-between p-0  line-clamp-1 ">
          <p className="  text-sm text-balance line-clamp-1 ">₹499</p>
          <p className="  text-sm text-balance line-clamp-1 ">
            ₹1599
            <span className=" text-xs font-normal line-clamp-1 text-green-300 tracking-normal text-muted-foreground">
              (67% off)
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-0 w-full">
        <Button className="w-full rounded-none ">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
