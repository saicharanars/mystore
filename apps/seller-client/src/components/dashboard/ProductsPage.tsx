import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/context/Authcontext';
import { useGetProductsQuery } from '../store/product/api';
import {
  useProductDispatch,
  useProductSelector,
} from '../store/product/producthooks';
import { setProducts } from '../store/product/productreducer';
import { DataTable } from '../common/DataTable';
import { columns } from './ProductTableColumns';
import TableSkelton from '../common/TableSkelton';
import { Link } from '@tanstack/react-router';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@ecommerce/ui-kit/ui';

const ProductsPage = () => {
  const products = useProductSelector((state) => state.product.products);
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const dispatch = useProductDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const {
    data: productsFromApi,
    isLoading,
    error,
  } = useGetProductsQuery({
    token,
    filters: { skip: String(currentPage * pageSize), limit: String(pageSize) },
  });

  useEffect(() => {
    if (productsFromApi) {
      dispatch(setProducts(productsFromApi));
      setTotalCount(productsFromApi.count);
      const newTotalPages = Math.ceil(productsFromApi.count / pageSize);
      setTotalPages(newTotalPages);
    }
  }, [productsFromApi, dispatch, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  };

  if (isLoading) {
    return <TableSkelton />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        An error occurred: {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <>
      <div className="p-2 m-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/dashboard/products">Products</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-1 md:py-10 px-2 overflow-scroll">
        {products && (
          <DataTable
            columns={columns}
            data={products}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            rowCount={totalCount}
            filters={['stock_quantity', 'status', 'price', 'stock_status']}
            title="Products"
          />
        )}
      </div>
    </>
  );
};

export default ProductsPage;
