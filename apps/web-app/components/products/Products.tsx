'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useGetProductsQuery } from '../../store/shop/api';
import store from '../../store/shop/store';
import { productsFiltersType } from '@ecommerce/types';
import ProductCard from '../../components/products/ProductCard';
import Filters from '../../components/products/Filters';
import SelectFilters from '../../components/filters/SelectFilters';
import { LoaderCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ecommerce/ui-kit/ui';

const filterOptions = {
  name: 'Fruits',
  values: ['C', 'Banana', 'Orange', 'Grapes'],
};

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<productsFiltersType>({
    category: undefined,
    minprice: undefined,
    maxprice: undefined,
    tags: undefined,
    offset: '0',
    limit: '10',
  });

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(filterParams);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (products && filterParams.limit) {
      const limit = parseInt(filterParams.limit);
      const totalProducts = products.count;
      setTotalPages(Math.ceil(totalProducts / limit));
    }
  }, [products, filterParams.limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilterParams((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(prev.limit)).toString(),
    }));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex mt-5">
      <div className="w-full h-20 md:h-36 bg-accent text-center flex flex-col gap-2 items-center justify-center m-0">
        <p className="text-primary text-3xl md:text-5xl font-bold capitalize">
          Bags
        </p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bags</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row gap-2 p-1 justify-end">
        <SelectFilters name="kgjv" values={filterOptions.values} />
        <SelectFilters
          name={filterOptions.name}
          values={filterOptions.values}
        />
      </div>
      <div className="flex items-start justify-between space-y-2 p-2 md:p-4 gap-2">
        <div className="grid grid-cols-4 justify-start gap-2 w-full">
          <div className="p-2 bg-white shadow-lg border-2 rounded-sm border-solid hidden md:block">
            <Filters
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
          </div>
          <div className="col-span-4 md:col-span-3 gap-2">
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-max justify-between gap-2">
              {isLoading ? (
                <LoaderCircle
                  strokeWidth="3"
                  className="text-blue-700 h-8 w-8 m-auto animate-spin col-span-full"
                />
              ) : error ? (
                <div className="col-span-full">Error loading products</div>
              ) : products && products.rows.length > 0 ? (
                products.rows.map((item) => (
                  <ProductCard
                    key={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    compare_price={item.compare_price}
                    id={item.id}
                  />
                ))
              ) : (
                <p className="col-span-full">No products found.</p>
              )}
            </div>
            <div className="w-full mt-4 p-4 m-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePrevious();
                      }}
                    />
                  </PaginationItem>
                  {renderPageNumbers()}
                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNext();
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Products: React.FC = () => {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
};

export default Products;