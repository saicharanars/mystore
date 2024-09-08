import React, { useContext } from 'react';
import CartContext from '../../store/context/cart';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  Button,
} from '@ecommerce/ui-kit/ui';
import { Minus, Plus, Trash2, X } from 'lucide-react'; // Assuming you're using this for the icons
import { cartProductType } from '@ecommerce/types';

const CartPage = () => {
  const { items, totalOrderValue, updateQuantity, clearCart, removeItem } =
    useContext(CartContext);

  const increment = (item: cartProductType) => {
    if (item.quantity < item.inventory_quantity) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const decrement = (item: cartProductType) => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const deleteItem = (id: string) => {
    removeItem(id);
  };
  const clearcart = () => {
    clearCart();
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex mt-5">
      <div className="w-full h-20 md:h-36 bg-accent text-center flex flex-col gap-2 items-center justify-center m-0">
        <p className="text-primary text-3xl md:text-5xl font-bold capitalize">
          Shopping Cart
        </p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Your Shopping Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {items.length > 0 ? (
        <div className="p-1 z-20 my-auto grid grid-cols-1 justify-center gap-2">
          <Button
            onClick={() => clearcart()}
            className="my-auto  text-destructive  justify-self-end"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4 text-destructive  text-center" />
          </Button>
          <Table>
            <TableHeader>
              <TableRow className="grid grid-cols-6 justify-center text-center">
                <TableHead className="text-center text-md md:text-xl">
                  Name
                </TableHead>
                <TableHead className="text-center text-md md:text-xl">
                  Price
                </TableHead>
                <TableHead className="text-center text-md md:text-xl">
                  Quantity
                </TableHead>
                <TableHead className="text-center text-md md:text-xl">
                  Add
                </TableHead>
                <TableHead className="text-center text-md md:text-xl">
                  Delete Item
                </TableHead>
                <TableHead className="text-right text-md md:text-xl">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="grid grid-cols-6 justify-center my-4"
                >
                  <TableCell className="my-auto text-center text-md md:text-xl">
                    <p className="font-medium line-clamp-1 my-auto">
                      {item.name}
                    </p>
                  </TableCell>
                  <TableCell className="my-auto  text-md md:text-xl text-center">
                    ₹ {item.price}
                  </TableCell>
                  <TableCell className="my-auto  text-md md:text-xltext-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="flex gap-2  text-md md:text-xlmy-auto text-center items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrement(item)}
                      disabled={item.quantity <= 1} // Disable when quantity is 1
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center my-auto">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increment(item)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center  text-md md:text-xl">
                    <Button
                      onClick={() => deleteItem(item.id)}
                      className="my-auto text-destructive"
                      variant="outline"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4 text-center text-destructive" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right text-md md:text-xl my-auto">
                    ₹ {item.price * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="grid grid-cols-6 justify-center">
                <TableCell colSpan={4} className=" text-end col-span-5">
                  <p className="font-bold  my-auto text-xl">Total:</p>
                </TableCell>
                <TableCell className="text-right">
                  <p className="font-bold  my-auto text-xl">
                    ₹ {totalOrderValue}
                  </p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold">
          Your cart is empty.
        </div>
      )}
    </div>
  );
};

export default CartPage;
