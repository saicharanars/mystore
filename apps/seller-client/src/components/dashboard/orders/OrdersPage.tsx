import { useContext, useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../store/orders/api';
import AuthContext from '../../store/context/Authcontext';
import { Skeleton, Table, TableBody, TableHeader } from '@ecommerce/ui-kit/ui';
import {
  useOrderDispatch,
  useOrderSelector,
} from '../../store/orders/orderhooks';
import { setOrders } from '../../store/orders/orderreducer';
import { LoaderCircle } from 'lucide-react';
import { DataTable } from '../../common/DataTable';
import { columns } from './OrderTableColumns';
import TableSkelton from '../../common/TableSkelton';

const OrdersPage = () => {
  const orders = useOrderSelector((state) => state.order.orders);
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const dispatch = useOrderDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const {
    data: ordersFromApi,
    isLoading,
    error,
  } = useGetOrdersQuery({
    token,
    pagination: { offset: '0', limit: '10' },
  });

  useEffect(() => {
    if (ordersFromApi) {
      console.log(ordersFromApi);
      dispatch(setOrders(ordersFromApi));
      setTotalPages(Math.ceil(ordersFromApi.count / pageSize));
    }
  }, [dispatch, ordersFromApi, pageSize]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

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
      {orders && (
        <DataTable
          columns={columns}
          data={orders}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          totalPages={totalPages}
          filters={['status']}
        />
      )}
    </div>
  );
};

export default OrdersPage;
