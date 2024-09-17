import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  CarouselMainContainer,
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from '@ecommerce/ui-kit/ui';
import { AspectRatio } from '@ecommerce/ui-kit/ui/lib/ui/aspect-ratio';
import { Separator } from '@ecommerce/ui-kit/ui/lib/ui/separator';
import AddButton from '../../../components/cart/AddButton';
import Image from 'next/image';
import { BookMarked, CircleAlert } from 'lucide-react';
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
import { productResponseType } from '@ecommerce/types';

async function getData(id: string) {
  const res = await fetch(`${url}/product/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  console.log(res.json);
  return res.json();
}
const page = async ({ params }: { params: { slug: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: { data: any } = await new Promise((resolve) =>
    setTimeout(async () => {
      resolve(await getData(params.slug));
    }, 1000)
  );
  const res: productResponseType = data.data;
  const add = res.additionproperties;
  return (
    <>
      <div className="col-span-5 px-10 mt-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">fashion</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="col-span-5 grid grid-cols-4  gap-3  px-0 md:px-10 mt-2">
        <div className=" col-span-4 md:col-span-2  h-full p-1 md:p-4">
          <Carousel>
            <CarouselNext className="top-1/3 -translate-y-1/3" />
            <CarouselPrevious className="top-1/3 -translate-y-1/3" />
            <CarouselMainContainer className="h-60">
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderMainItem key={index} className="bg-transparent">
                  <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        quality={40}
                        fill
                        style={{
                          objectFit: 'contain',
                        }}
                        src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf4751f0eac800de9da40b/retailez-1920x1080.png"
                        alt="hello"
                      />
                    </AspectRatio>
                  </div>
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer>
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderThumbItem
                  key={index}
                  index={index}
                  className="bg-transparent"
                >
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      quality={40}
                      fill
                      style={{
                        objectFit: 'scale-down',
                      }}
                      src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf4751f0eac800de9da40b/retailez-1920x1080.png"
                      alt="hello"
                    />
                  </AspectRatio>
                </SliderThumbItem>
              ))}
            </CarouselThumbsContainer>
          </Carousel>
        </div>
        <div className=" col-span-4 md:col-span-2 h-full p-4 ml-2 grid grid-cols-1 gap-2 ">
          <h2 className="  text-muted-foreground font-semibold capitalize ">
            {res.name}
          </h2>
          <h2 className="   font-semibold text-2xl line-clamp-2  ">
            {res.description}
          </h2>
          <p className="   text-muted-foreground">
            {' '}
            {res.inventory_quantity} unit
          </p>
          <p className="flex flex-row gap-2">
            {' '}
            ₹{res.price} MRP{' '}
            <span className=" text-muted-foreground">₹{res.compare_price}</span>{' '}
            <span className=" text-green-500">12% OFF</span>
          </p>
          <Separator className="my-4" />
          <AddButton
            name={res.name}
            id={res.id}
            price={res.price}
            quantity={0}
            inventory_quantity={res.inventory_quantity}
          />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" capitalize text-muted-foreground  text-lg">
                <span className="flex flex-row gap-3 ">
                  <BookMarked className=" h-4 w-4 my-auto " />
                  product details
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {add &&
                  Object.entries(add).map(([key, value]) => (
                    <li key={key} className="grid grid-cols-1 gap-2">
                      <span className="grid grid-cols-2 gap-3 p-2 my-auto">
                        <p className="capitalize font-medium text-sm">{key}:</p>
                        <p className="font-medium capitalize text-sm text-muted-foreground">
                          {String(value)}
                        </p>
                      </span>
                      <Separator className="my-1" />
                    </li>
                  ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" capitalize text-muted-foreground  text-lg">
                <span className="flex flex-row gap-3 ">
                  <CircleAlert className=" h-4 w-4 my-auto " />
                  product description
                </span>
              </AccordionTrigger>
              <AccordionContent>{res.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default page;
