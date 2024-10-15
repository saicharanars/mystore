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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  AlertDescription,
  Alert,
  AlertTitle,
} from '@ecommerce/ui-kit/ui';
import { Link } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';

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
      <Alert variant="destructive" className="max-w-sm m-4 mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {`An error occurred: ${
            (error as { message?: string }).message || 'Please try again later.'
          }`}
        </AlertDescription>
      </Alert>
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
              <Link to="/dashboard/orders">Orders</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
    </>
  );
};

export default OrdersPage;
