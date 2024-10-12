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
import { columns } from './ShipmentTableColumns';
import TableSkelton from '../../common/TableSkelton';
import {
  useShipmentDispatch,
  useShipmentSelector,
} from '../../store/shipments/shipmenthooks';
import { useGetShipmentsQuery } from '../../store/shipments/api';
import { setShipments } from '../../store/shipments/shipmentreducer';

const ShipmentsPage = () => {
  const shipments = useShipmentSelector((state) => state.shipment.shipments);
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const dispatch = useShipmentDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const {
    data: shipmentsFromApi,
    isLoading,
    error,
  } = useGetShipmentsQuery({
    token,
    pagination: { offset: '0', limit: '10' },
  });

  useEffect(() => {
    if (shipmentsFromApi) {
      console.log(shipmentsFromApi);
      dispatch(setShipments(shipmentsFromApi));
      setTotalPages(Math.ceil(shipmentsFromApi.count / pageSize));
    }
  }, [dispatch, pageSize, shipmentsFromApi]);

  useEffect(() => {
    console.log(shipments);
  }, [shipments]);

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
      {shipments && (
        <DataTable
          columns={columns}
          data={shipments}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          totalPages={totalPages}
          //   filters={['status']}
        />
      )}
    </div>
  );
};

export default ShipmentsPage;
