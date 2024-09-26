const Footer = () => {
  const pages = [
    'About Us',
    'Career',
    'Contact Us',
    'Media',
    'Pricing',
    'Privacy Policy',
    'Refund & Cancellation Policies',
    'Return Policy',
    'Seller App Policy',
    'Terms & Conditions',
    'Shipping & Delivery Policies',
  ];
  const explore = [
    ' Help Topics',
    ' Sell on Mystore',
    ' Blogs',
    'Packaging Guidelines',
    'Product Sorting Criterion',
    'Seller Training Manual',
    'SEO Guidelines',
    'Track Your Order',
    'Transactional Cost',
    'Settlement',
  ];
  const collections = [
    'Amazing India',
    'Direct From Farmers',
    'Fashion on ONDC',
    'Home Decor on ONDC',
    'Summer Collection',
  ];
  const ondc = [
    'Sell on ONDC Network',
    'Seller manager on ONDC Network',
    'Mystore Channel Integrations',
    'Amazon sellers on ONDC Network',
    'Shopify merchants on ONDC Network',
    'WooCommerce Merchants on ONDC Network',
    'Magento Merchants on ONDC Network',
    'Mystore ONDC Network Logistics Solutions',
  ];
  return (
    <div className="bg-secondary mt-2 p-1 md:p-8  ">
      <div className="grid grid-cols-2 md:grid-cols-6">
        <div className="flex justify-start flex-col align-middle content-center p-6 col-span-2">
          <h1 className="text-2xl text-bold  ml-2  text-secondary-foreground ">
            About Mystore
          </h1>
          <p className="mt-5 text-secondary-foreground text-sm p-2 ">
            Mystore is an ONDC network-connected ecosystem built in India for
            Indian sellers. Mystore is the first ONDC network participant to
            connect as a Buyer and Seller NP.
            <br />
            You can register as a seller on Mystore and upload your catalogue.
            You will have a dedicated Seller page (digi-catalog) along with a
            Unique QR Code for your page that you can market to your buyers.
            Your catalogue will also appear on the ONDC network through the
            Mystore Buyer App and other buyer apps catering to related product
            domains. Mystore provides a comprehensive seller dashboard to manage
            your products, orders, and payouts.
            <br />
            Mystore also facilitates seamless online shopping across categories
            with its Mystore
          </p>
        </div>
        <div className="flex flex-col p-6 gap-2">
          <h1 className="text-xl font-bold text-secondary-foreground">Pages</h1>
          {pages.map((item, index) => (
            <p key={index} className="text-secondary-foreground text-sm">
              {item}
            </p>
          ))}
        </div>

        <div className="flex flex-col p-6 gap-2">
          <h1 className="text-xl font-bold text-secondary-foreground">
            Explore
          </h1>
          {explore.map((item, index) => (
            <p key={index} className="text-secondary-foreground text-sm">
              {item}
            </p>
          ))}
        </div>
        <div className="flex flex-col p-6 gap-2">
          <h1 className="text-xl font-bold text-secondary-foreground">
            Collection
          </h1>
          {collections.map((item, index) => (
            <p key={index} className="text-secondary-foreground text-sm">
              {item}
            </p>
          ))}
        </div>
        <div className="flex flex-col p-6 gap-2">
          <h1 className="text-xl font-bold text-secondary-foreground">
            Ondc Network
          </h1>
          {ondc.map((item, index) => (
            <p key={index} className="text-secondary-foreground text-sm">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
