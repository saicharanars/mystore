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

const ProductsPage = () => {
  const products = useProductSelector((state) => state.product.products);
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const dispatch = useProductDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

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
      setTotalPages(Math.ceil(productsFromApi.count / pageSize));
    }
  }, [productsFromApi, dispatch, pageSize]);

  useEffect(() => {
    console.log(products);
  }, [products]);

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
    <div className="container mx-auto py-1 md:py-10 px-2 overflow-scroll">
      {products && (
        <DataTable
          columns={columns}
          data={products}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          totalPages={totalPages}
          filters={['stock_quantity', 'status', 'price', 'stock_status']}
        />
      )}
    </div>
  );
};

export default ProductsPage;
