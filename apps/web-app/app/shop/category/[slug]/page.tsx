import Products from '../../../../components/products/Products';

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <Products category={params.slug} />
    </div>
  );
};
export default Page;
