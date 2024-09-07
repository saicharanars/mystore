import { Skeleton } from '@ecommerce/ui-kit/ui';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@ecommerce/ui-kit/ui';
import { Separator } from '@ecommerce/ui-kit/ui/lib/ui/separator';

export default function Loading() {
  return (
    <>
      <div className="col-span-5 grid grid-cols-4 gap-3 px-0 md:px-10 mt-2">
        <div className="col-span-4 md:col-span-2 h-full p-1 md:p-4">
          <Skeleton className="h-[300px] w-full rounded-md" />
          <div className="mt-4 flex space-x-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-16 rounded-md" />
            ))}
          </div>
        </div>

        <div className="col-span-4 md:col-span-2 h-full p-4 ml-2 grid grid-cols-1 gap-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-6 w-[100px] mt-2" />
          <Separator className="my-4" />
          <Skeleton className="h-10 w-[120px] rounded-md" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="capitalize text-muted-foreground text-lg">
                <span className="flex flex-row gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-[200px]" />
                </span>
              </AccordionTrigger>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="capitalize text-muted-foreground text-lg">
                <span className="flex flex-row gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-[200px]" />
                </span>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
