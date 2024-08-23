'use client';
import React, { ReactNode, useState } from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import {
  Card,
  CardContent,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui/lib/ui/card';

interface FiltersProps {
  children: ReactNode;
}
// Main Filters component
const Filters: React.FC<FiltersProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 ">
        <h4 className="text-sm font-semibold">Filters</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default Filters;
