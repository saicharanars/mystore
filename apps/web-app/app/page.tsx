import React from 'react';
import CategoryCarousel from '../components/header/CategoryCarousel';
import Photocarousel from '../components/hero/Photocarousel';
import Carouseloffers from '../components/hero/Carouseloffers';
import Productcarousel from '../components/products/Productcarousel';
import Offers from '../components/products/Offers';
const images = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66b9fec215537600b182a943/home-decor-640x640.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66b9feab317c860024794db4/farm-to-fork-640x640.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66b9fe8bc030bd002b06e02f/amazing-india-640x640.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bb2dc6c01ec000dd502b0f/back-to-school-640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bb2ddf6972d500b1aaf479/gift-cards-640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf0b08c44f79003079f2bc/fashion-640x640.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bb2ddf6972d500b1aaf479/gift-cards-640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf0b08c44f79003079f2bc/fashion-640x640.png',
];
const data = [
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'bfd351f5-1bec-4ca4-8240-6c0bf01e81c3',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'e90fb32b-73bb-43f5-9c48-10b35ce49ea9',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'bfd351f5-1bec-4ca4-8240-6c0bf01e81c3',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'e90fb32b-73bb-43f5-9c48-10b35ce49ea9',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'bfd351f5-1bec-4ca4-8240-6c0bf01e81c3',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'e90fb32b-73bb-43f5-9c48-10b35ce49ea9',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'bfd351f5-1bec-4ca4-8240-6c0bf01e81c3',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: 'e90fb32b-73bb-43f5-9c48-10b35ce49ea9',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: '81a211d8-3db3-4a7a-a5d3-49721df4027d',
  },
  {
    name: 'my new book',
    category: 'Fiction',
    description: 'A thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: '2a4cd23b-854a-4ca1-bbff-b11f066610c0',
  },
  {
    name: 'my new jhok kfjg kgbook',
    category: 'Fiction',
    description: 'A gjhkm thrilling tale of adventure and mystery.',
    price: 19,
    compare_price: 24,
    inventory_quantity: 10,
    tags: ['mystery', 'adventure', 'new release'],
    additionproperties: null,
    id: '58ca59ac-772f-4c80-a4d3-641e512a4e2d',
  },
];
const dealsbybrand = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66d80ef6dbeab700b1dfbff0/godrej-1--640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/6654178aa77c3f04b6fe21d1/acwo-6--640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/668e2a7ee0546800adef0e3d/hero-8--640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/665417acf54f0e04b2b064af/epson-4--640x640.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/65f552b736f9125e948fd731/croma-3--640x640.jpg',
];
const electronics = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c870a5c678840032d6e341/croma-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c870c9c678840032d6e901/whirlpool-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/664ed699c1068e0032699356/phillips-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c8710f46cd38003a1e8279/saregama-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66d1989e3de4a50036eb5aaf/haier-480x480.jpg',
];
const beauty = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c86ccf46cd38003a1dea89/beardo-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/666839e5c6f97800361d5381/svish-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c86d06c678840032d6408f/quintessential-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c86e182c5079002b126163/fab-india-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c86e782c5079002b12708b/beautybasket-480x480.jpg',
];
const grocery = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c86e782c5079002b12708b/beautybasket-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c86e782c5079002b12708b/beautybasket-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66c876ea46cd38003a1f7bdb/panchabhootani-480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/667ba335c67979002b204def/amul-1--480x480.jpg',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/667ba335c67979002b204def/amul-1--480x480.jpg',
];
const page = () => {
  return (
    <div className="mx-1 md:mx-4">
      <CategoryCarousel />
      <Photocarousel />
      <Offers title="Deals By Brand" images={dealsbybrand} />
      <Offers title="Electronics" images={electronics} />
      <Productcarousel title="Lowest price Gauaranteed" products={data} />
      <Offers title="Beauty" images={beauty} />
      <Offers title="Grocery" images={grocery} />
    </div>
  );
};

export default page;
