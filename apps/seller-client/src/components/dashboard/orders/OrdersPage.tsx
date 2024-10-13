import { useContext, useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../store/orders/api';
import AuthContext from '../../store/context/Authcontext';
import {
  useOrderDispatch,
  useOrderSelector,
} from '../../store/orders/orderhooks';
import { setOrders } from '../../store/orders/orderreducer';
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
  const [totalCount, setTotalCount] = useState(0);

  const {
    data: ordersFromApi,
    isLoading,
    error,
  } = useGetOrdersQuery({
    token,
    pagination: {
      offset: String(currentPage * pageSize),
      limit: String(pageSize),
    },
  });

  useEffect(() => {
    if (ordersFromApi) {
      dispatch(setOrders(ordersFromApi));
      setTotalCount(ordersFromApi.count);
      setTotalPages(Math.ceil(ordersFromApi.count / pageSize));
    }
  }, [dispatch, ordersFromApi, pageSize]);

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
    <div className="container mx-auto py-1 md:py-10 px-2 overflow-scroll">
      {orders && (
        <DataTable
          columns={columns}
          data={orders}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalPages={totalPages}
          rowCount={totalCount}
          filters={['status']}
          title="Orders"
        />
      )}
    </div>
  );
};

export default OrdersPage;
