const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = Math.round((subtotal + shipping) * 100);
  
  console.log('API - Order Calculation:', {
    items: items,
    subtotal: subtotal,
    shipping: shipping,
    totalInCents: total
  });
  
  return total;
};

export default async function handler(req, res) {
  try {
    const { items } = req.body;
    console.log('API - Received Items:', items);

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Please provide cart items' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_items: JSON.stringify(items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })))
      }
    });

    console.log('API - Created Payment Intent:', {
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      id: paymentIntent.id
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('API - Error:', error);
    res.status(500).json({ error: error.message });
  }
}