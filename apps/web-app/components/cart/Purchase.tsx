import AuthContext from '../../store/context/auth';
import { FC, useContext } from 'react';
import axios from 'axios';
import {
  createOrderResponseType,
  orderresponseType,
  paymentResponseType,
  verifypaymentbodyType,
} from '@ecommerce/types';
import { Button } from '@ecommerce/ui-kit/ui';
import CartContext from '../../store/context/cart';

interface product {
  id: string;
  quantity: number;
}

interface Ipurchase {
  ordervalue: number;
  products: product[];
}

const Purchase: FC<Ipurchase> = ({ ordervalue, products }) => {
  const authctx = useContext(AuthContext);
  const cartctx = useContext(CartContext);
  const amount = ordervalue;
  const token = 'Bearer ' + authctx.token;
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const orderPlace = async (verifypayment: verifypaymentbodyType) => {
    console.log('order placed', verifypayment);
    const capture = await axios.post(
      `${api}/order/update-transaction-status`,
      {
        verifypaymentbody: verifypayment,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const res: orderresponseType = capture.data.data;
    console.log(res);
    alert(res);
    cartctx.updateOrderStatus(res.status);
  };

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    console.log(api, token);

    const response = await axios.post(
      `${api}/order/create-order`,
      {
        amount,
        products,
      },
      { headers: { Authorization: token } }
    );
    const orderres: createOrderResponseType = response.data.data;
    const orderId = orderres.orderId;
    const rzporderId = orderres.razorpayorderId;
    console.log(response, orderId, rzporderId);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'Sai Charan',
      order_id: rzporderId,
      description: 'Test Transaction',
      callback_url: `http://localhost:3000/order/update-transaction-status`,
      image: 'https://avatars.githubusercontent.com/u/127005659?v=4',
      handler: function (response: paymentResponseType) {
        const payment = { ...response, order_id: orderId };
        console.log(response, payment);
        orderPlace(payment);
      },
      prefill: {
        name: 'Sai Charan ',
        email: 'saicharanars@gmail.com',
        contact: '8886330176',
      },
      config: {
        display: {
          blocks: {
            name: 'All Payment Options',
            instruments: [
              {
                method: 'upi',
              },
              {
                method: 'card',
              },
              {
                method: 'wallet',
              },
              {
                method: 'netbanking',
              },
            ],
          },
        },
        sequence: ['block.banks'],
        preferences: {
          show_default_blocks: false,
        },
      },
      theme: {
        color: '#7c3aed',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="App">
      <Button
        onClick={() => {
          pay();
        }}
      >
        Pay Now
      </Button>
    </div>
  );
};

export default Purchase;
