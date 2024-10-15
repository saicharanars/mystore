import { useContext, useEffect } from 'react';
import AuthContext from '../store/context/Authcontext';
import { useGetProductsQuery } from '../store/product/api';
import {
  useProductDispatch,
  useProductSelector,
} from '../store/product/producthooks';
import { setProducts } from '../store/product/productreducer';
import TableSkelton from '../common/TableSkelton';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@ecommerce/ui-kit/ui';
import { AlertCircle } from 'lucide-react';

const RecentProducts = () => {
  const products = useProductSelector((state) => state.product.products);
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const dispatch = useProductDispatch();

  const {
    data: productsFromApi,
    isLoading,
    error,
  } = useGetProductsQuery({
    token,
    filters: { skip: '0', limit: '5' },
  });

  useEffect(() => {
    if (productsFromApi) {
      dispatch(setProducts(productsFromApi));
    }
  }, [productsFromApi, dispatch]);

  if (isLoading) {
    return <TableSkelton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
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
  const formattedDate = (date: Date) => {
    const newdate = new Date(date);
    const res = newdate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return res;
  };

  return (
    <div>
      <h1 className="text-xl font-bold p-1 m-1">Recent Orders</h1>
      {products.map((item) => (
        <Card
          key={item._id}
          className="flex flex-row items-center justify-between gap-2 p-1 m-2"
        >
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <p className=" text-neutral-600">
              {item.created_at && formattedDate(item.created_at)}
            </p>
          </CardHeader>

          <CardFooter>₹{item.price}</CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecentProducts;
