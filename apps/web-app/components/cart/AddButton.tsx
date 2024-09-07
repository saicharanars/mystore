'use client';
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@ecommerce/ui-kit/ui';

const AddButton = () => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(0, prev - 1));

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={quantity === 0}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button variant="outline" size="icon" onClick={increment}>
        <Plus className="h-4 w-4" />
      </Button>
      <Button className="ml-4">
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  );
};

export default AddButton;
