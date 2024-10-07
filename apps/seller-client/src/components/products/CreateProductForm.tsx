import React, { useContext, useState } from 'react';
import { useForm, useFieldArray, FieldArrayPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from '@ecommerce/ui-kit/ui';
import { CircleX, Plus, Upload } from 'lucide-react';
import { createProductFormSchema } from '@ecommerce/types';
import AuthContext from '../store/context/Authcontext';
import {
  useAddimageMutation,
  useAddProductMutation,
} from '../store/product/api';
import { toast, useToast } from '@ecommerce/ui-kit/ui/lib/ui/use-toast';

type FormValues = z.infer<typeof createProductFormSchema> & {
  categories: string[];
  tags: string[];
};

const CreateProductForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [addImage, { isLoading: isImageLoading, error: imageError }] =
    useAddimageMutation();
  const [
    addProduct,
    { isLoading: isProductLoading, isSuccess, error: productError },
  ] = useAddProductMutation();

  const authctx = useContext(AuthContext);
  const authorization = `Bearer ${authctx.token}`;

  const form = useForm<FormValues>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      status: 'draft',
      visibility: true,
      description: '',
      short_description: '',
      price: 0,
      compare_price: 0,
      sale_price: 0,
      on_sale: false,
      stock_quantity: 0,
      stock_status: 'in_stock',
      categories: [],
      tags: [],
      attributes: {},
    },
  });

  const {
    fields: categoryFields = [],
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: 'categories' as FieldArrayPath<FormValues>,
  });

  const {
    fields: tagFields = [],
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: 'tags' as FieldArrayPath<FormValues>,
  });
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >([]);

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newAttributes = [...attributes];

    newAttributes[index] = {
      ...newAttributes[index],
      [field]: value,
    };

    setAttributes(newAttributes);

    const attributesObject = newAttributes.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {} as Record<string, string | number>);

    form.setValue('attributes', attributesObject);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    console.log('Data >>>>>>', data);

    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });

    console.log('FormData:', formData);
    try {
      const res = await addImage({
        images: selectedFiles,
        token: authorization,
      }).unwrap();
      console.log('Images uploaded successfully:', res);
      const productdata = { ...data, images: res };
      const pro = await addProduct({
        body: productdata,
        token: authorization,
      });
      console.log(pro);
    } catch (error) {
      console.error(error);
    }
  };
  if (isSuccess) {
    toast({
      title: 'Product Created',
      variant: 'default',
      description: 'Your product has been created successfully.',
      duration: 5000,
    });
  }
  if (imageError || productError) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      duration: 5000,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto bg-background p-6 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Enter product slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Visibility</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product short description"
                  {...field}
                  className="min-h-[60px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Product Images</FormLabel>
          <div className="mt-2 space-y-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Images
            </label>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1"
                >
                  <CircleX className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="compare_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compare Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter compare price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter sale price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="on_sale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>On Sale</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="stock_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter stock quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stock status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="in_stock">In stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of stock</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Categories</FormLabel>
          {categoryFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-2">
              <FormControl>
                <Input
                  placeholder="Enter category"
                  {...form.register(`categories.${index}`)}
                  className="flex-grow"
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeCategory(index)}
                className="flex-shrink-0"
              >
                <CircleX className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendCategory('')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <div>
          <FormLabel>Tags</FormLabel>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-2">
              <FormControl>
                <Input
                  placeholder="Enter tag"
                  {...form.register(`tags.${index}`)}
                  className="flex-grow"
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeTag(index)}
                className="flex-shrink-0"
              >
                <CircleX className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendTag('')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
        </div>

        <div>
          <FormLabel>Attributes</FormLabel>
          {attributes.map((attr, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Enter attribute key"
                value={attr.key}
                onChange={(e) =>
                  handleAttributeChange(index, 'key', e.target.value)
                }
                className="flex-grow"
              />
              <Input
                placeholder="Enter attribute value"
                value={attr.value}
                onChange={(e) =>
                  handleAttributeChange(index, 'value', e.target.value)
                }
                className="flex-grow"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeAttribute(index)}
                className="flex-shrink-0"
              >
                <CircleX className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addAttribute}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Attribute
          </Button>
        </div>

        <Button type="submit" className="w-full">
          {isImageLoading || isProductLoading
            ? isImageLoading
              ? 'Uploading Images...'
              : 'Adding Product...'
            : 'create product'}
        </Button>
      </form>
    </Form>
  );
};
export default CreateProductForm;
