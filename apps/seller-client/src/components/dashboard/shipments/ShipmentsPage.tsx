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
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalPages={totalPages}
          rowCount={totalCount}
          title="Shipments"
          //   filters={['status']}
        />
      )}
    </div>
  );
};

export default ShipmentsPage;
