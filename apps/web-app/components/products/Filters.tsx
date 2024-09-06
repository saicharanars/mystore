import { productsFiltersType } from '@ecommerce/types';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ecommerce/ui-kit/ui';
import { Label } from '@ecommerce/ui-kit/ui/lib/ui/label';
import { useState, FormEvent } from 'react';

interface SidebarFiltersProps {
  filterParams: productsFiltersType;
  setFilterParams: (params: productsFiltersType) => void;
}

const categories = [
  'fashion',
  'electronics',
  'mobiles',
  'grocery',
  'food',
  'home',
  'kitchen',
  'Beauty',
];

const Filters: React.FC<SidebarFiltersProps> = ({
  filterParams,
  setFilterParams,
}) => {
  const [category, setCategory] = useState(filterParams.category || 'all');
  const [minPrice, setMinPrice] = useState<string | number>(
    filterParams.minprice || ''
  );
  const [maxPrice, setMaxPrice] = useState<string | number>(
    filterParams.maxprice || ''
  );
  const [tags, setTags] = useState(filterParams.tags || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedFilters: productsFiltersType = {
      ...filterParams,
      category: category === 'all' ? undefined : category,
    };

    if (minPrice !== '') {
      updatedFilters.minprice = String(minPrice);
    } else {
      delete updatedFilters.minprice;
    }

    if (maxPrice !== '') {
      updatedFilters.maxprice = String(maxPrice);
    } else {
      delete updatedFilters.maxprice;
    }

    if (tags !== '') {
      updatedFilters.tags = tags;
    } else {
      delete updatedFilters.tags;
    }

    setFilterParams(updatedFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 gap-2">
      <div>
        <h1 className="text-xl font-semibold">Filters</h1>

        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="minprice">Min Price</Label>
        <Input
          type="number"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <Label htmlFor="maxprice">Max Price</Label>
        <Input
          type="number"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <Label htmlFor="tags">Tags </Label>
        <Input
          type="text"
          placeholder="Enter tags, e.g., trendy, new"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full bg-primary text-white">
        Apply Filters
      </Button>
    </form>
  );
};

export default Filters;
