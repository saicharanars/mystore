import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ecommerce/ui-kit/ui';
import { FC } from 'react';

interface FilterValues {
  name: string;
  values: string[];
}

const SelectFilters: FC<FilterValues> = ({ name, values }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select ${name}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{name}</SelectLabel>
          {values.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilters;
