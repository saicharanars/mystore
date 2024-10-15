import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/context/Authcontext';
import { DataTable } from '../../common/DataTable';
import { columns } from './ShipmentTableColumns';
import TableSkelton from '../../common/TableSkelton';
import {
  useShipmentDispatch,
  useShipmentSelector,
} from '../../store/shipments/shipmenthooks';
import { useGetShipmentsQuery } from '../../store/shipments/api';
import { setShipments } from '../../store/shipments/shipmentreducer';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@ecommerce/ui-kit/ui';
import { Link } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';

const ShipmentsPage = () => {
  const shipments = useShipmentSelector((state) => state.shipment.shipments);
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const dispatch = useShipmentDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const {
    data: shipmentsFromApi,
    isLoading,
    error,
  } = useGetShipmentsQuery({
    token,
    pagination: {
      offset: String(currentPage * pageSize),
      limit: String(pageSize),
    },
  });

  useEffect(() => {
    if (shipmentsFromApi) {
      console.log(shipmentsFromApi);
      dispatch(setShipments(shipmentsFromApi));
      setTotalCount(shipmentsFromApi.count);
      setTotalPages(Math.ceil(shipmentsFromApi.count / pageSize));
    }
  }, [dispatch, pageSize, shipmentsFromApi]);

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
              <Link to="/dashboard/shipments">Shipments</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-1 md:py-10 px-2 overflow-scroll">
        {shipments && (
          <DataTable
            columns={columns}
            data={shipments}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            totalPages={totalPages}
            rowCount={totalCount}
            title="Shipments"
          />
        )}
      </div>
    </>
  );
};

export default ShipmentsPage;
