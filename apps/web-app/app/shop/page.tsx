'use client';
import { User, schema } from '@ecommerce/types';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/products/ProductCard';
import Filters from '../../components/products/Filters';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import SelectFilters from '../../components/filters/SelectFilters';

const filterOptions = {
  name: 'Fruits',
  values: ['C', 'Banana', 'Orange', 'Grapes'],
};

export default function Index() {
  const [validationResult, setValidationResult] = useState<boolean>(false);
  useEffect(() => {
    // Perform schema validation
    const data: User = {
      name: 'John Doe',
      age: 6,
      email: 's@h.com',
    };
    try {
      const result = schema.safeParse(data);
      setValidationResult(true);
      console.log(result, validationResult);
    } catch (error) {
      console.log(error);
    }
  }, [validationResult]);

  return (
    <div className=" h-full flex-1 flex-col space-y-8  md:flex mt-5">
      <div className="w-full h-20 md:h-36 bg-accent text-center flex flex-col gap-2 items-center justify-center m-0">
        <p className="text-primary text-3xl md:text-5xl font-bold capitalize ">
          Bags
        </p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row gap-2 p-1 justify-end ">
        <SelectFilters name="kgjv" values={filterOptions.values} />
        <SelectFilters
          name={filterOptions.name}
          values={filterOptions.values}
        />
      </div>
      <div className="flex  items-start justify-between space-y-2 p-2 md:p-4 gap-2">
        <div className="grid grid-cols-4 justify-start gap-2">
          <div className="p-2 bg-white shadow-lg border-2   rounded-sm  border-solid hidden md:block">
            <Filters>
              <SelectFilters
                name={filterOptions.name}
                values={filterOptions.values}
              />
            </Filters>
          </div>
          <div className="col-span-4 md:col-span-3 gap-2">
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-max justify-between  gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <ProductCard key={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
