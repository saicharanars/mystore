'use client';
import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@ecommerce/ui-kit/ui';
import { cartProductType } from '@ecommerce/types';
import CartContext from '../../store/context/cart';

const Add: React.FC<cartProductType> = ({
  name,
  id,
  price,
  inventory_quantity,
}) => {
  const cartctx = useContext(CartContext);

  const handleAddToCart = () => {
    const product: cartProductType = {
      id,
      name,
      price,
      inventory_quantity,
      quantity: 1,
    };
    cartctx.addItem(product);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button className="ml-4" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  );
};

const AddButton: React.FC<cartProductType> = (props) => {
  return <Add {...props} />;
};

export default AddButton;
