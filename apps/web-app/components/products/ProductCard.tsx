import { createProductType, productcardResponseType } from '@ecommerce/types';
import { Button } from '@ecommerce/ui-kit/ui';
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from '@ecommerce/ui-kit/ui/lib/ui/card';
import Image from 'next/image';

const ProductCard: React.FC<productcardResponseType> = (createProductType) => {
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
        <p className="  text-lg text-balance line-clamp-1 p-0">
          {createProductType.name}
        </p>
        <p className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
          {createProductType.category}
        </p>
        <div className="flex  justify-between p-0  line-clamp-1 ">
          <p className="  text-sm text-balance line-clamp-1 ">
            ₹{createProductType.price}
          </p>
          <p className="  text-sm text-balance line-clamp-1 ">
            ₹{createProductType.compare_price}
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
