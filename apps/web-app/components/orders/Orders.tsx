'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { paginationType } from '@ecommerce/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ecommerce/ui-kit/ui';
import store from '../../store/orders/store';
import { useGetOrdersQuery } from '../../store/orders/api';
import ProductCardSkeleton from '../products/ProductCardSkelton';
import AuthContext from '../../store/context/auth';
import Image from 'next/image';

function Shop() {
  const authctx = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<paginationType>({
    offset: '0',
    limit: '10',
  });

  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery({
    ...filterParams,
    token: authctx.token,
  });
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    console.log(authctx.token);
  }, [authctx.token]);

  useEffect(() => {
    if (orders && filterParams.limit) {
      const limit = parseInt(filterParams.limit);
      const totalProducts = orders.count;
      setTotalPages(Math.ceil(totalProducts / limit));
    }
  }, [orders, filterParams.limit]);

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
          ORDERS
        </p>
      </div>

      <div className="flex items-start justify-between space-y-2 p-2 md:p-4 gap-2">
        <div className="grid grid-cols-1 justify-center gap-2 w-full">
          <div className=" gap-2">
            <div className="flex flex-col justify-start items-start gap-2">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : error ? (
                <div className="col-span-full">
                  Error loading products{JSON.stringify(error)}
                </div>
              ) : orders && orders.items.length > 0 ? (
                orders.items.map((item) => (
                  <>
                    <Card key={item.id} className="w-full  ">
                      <CardContent className="  my-auto p-0 md:p-2 ">
                        <CardDescription className="my-auto flex flex-row p-0 md:p-2 align-middle items-between justify-between gap-4 ">
                          <div className="p-0 md:p-2 m-2 flex flex-col justify-start gap-4">
                            <p className="text-md md:text-xl font-semibold my-auto m-2">
                              {item.products
                                .map((product) => product.name)
                                .join(' & ')}
                            </p>
                            <div className="flex flex-row items-center flex-wrap align-middle gap-3">
                              {item.products.map((product) => (
                                <>
                                  <Card
                                    key={product.id}
                                    className="  shadow-md grid grid-cols-4 items-center gap-1 rounded-md"
                                  >
                                    <CardHeader className="p-0 w-full">
                                      <Image
                                        loading="lazy"
                                        alt="Mystore"
                                        title="Mystore"
                                        width={55}
                                        height={22}
                                        style={{
                                          objectFit: 'fill',
                                        }}
                                        src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/657f4354a5ffb6e03b970264/whatsapp-image-2023-12-02-at-15-36-13-420x420.jpeg"
                                        className="h-auto mx-auto"
                                        ms-data-valign="middle"
                                      />
                                    </CardHeader>
                                    <CardContent className="col-span-3 flex flex-col justify-start  align-middle p-2 items-center gap-2">
                                      <p className=" text-xs md:text-lg text-balance line-clamp-1 p-0">
                                        {product.name}
                                      </p>
                                      <div className="flex flex-row items-center justify-between gap-3">
                                        <p className=" text-xs md:text-sm text-balance line-clamp-1 ">
                                          ₹{product.price}
                                        </p>
                                        <p className="  text-sm text-balance line-clamp-1 ">
                                          qty : {product.OrderProduct.quantity}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </>
                              ))}
                            </div>
                          </div>
                          <div className="p-0 md:p-2 m-2 my-auto">
                            <p className=" text-md md:text-lg text-balance my-auto font-bold text-card-foreground line-clamp-1 p-0">
                              {item.status}
                            </p>
                          </div>
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </>
                ))
              ) : (
                <>
                  <p className="col-span-full">No products found.</p>
                </>
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

const Orders: React.FC = () => {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
};

export default Orders;
