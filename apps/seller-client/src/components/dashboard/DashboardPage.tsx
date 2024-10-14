import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  Card,
  CardContent,
  CardFooter,
} from '@ecommerce/ui-kit/ui';
import {
  ChartNoAxesColumnIncreasingIcon,
  IndianRupee,
  Package,
  Shirt,
  Triangle,
} from 'lucide-react';
import RecentProducts from '../products/RecentProducts';
import { FC, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

interface CardProps {
  name: string;
  icon: ReactNode;
}

const MetricCard: FC<CardProps> = ({ name, icon }) => {
  return (
    <Card className="w-auto min-w-52 relative md:w-full ">
      <CardContent className="flex flex-row items-center  justify-between align-middle p-4 m-4  md:p-2 my-auto">
        <div className="p-2  bg-accent rounded-lg">{icon}</div>
        <div>
          <p className=" capitalize font-bold text-lg  line-clamp-1 text-ellipsis">
            {name}
          </p>
          <h1 className="text-center">14528</h1>
        </div>
      </CardContent>
      <CardFooter className="py-4 px-8 bg-secondary">
        <Triangle className="h-5 w-5 mr-2 text-green-600" />

        <p className=" text-secondary-foreground">2.3% Last Week</p>
      </CardFooter>
    </Card>
  );
};

export default function DashboardPage() {
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
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-1 m-1 md:p-4">
        <MetricCard
          name="total order"
          icon={<Package className="h-10 w-10 text-primary" />}
        />
        <MetricCard
          name="Total Revenue"
          icon={<IndianRupee className="h-10 w-10 text-primary" />}
        />
        <MetricCard
          name="Sales"
          icon={
            <ChartNoAxesColumnIncreasingIcon className="h-10 w-10 text-primary" />
          }
        />
        <MetricCard
          name="Products"
          icon={<Shirt className="h-10 w-10 text-primary" />}
        />
      </div>
      <div className=" p-0 md:p-2 overflow-x-hidden">
        <RecentProducts />
      </div>
    </>
  );
}
