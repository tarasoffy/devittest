import {useState} from 'react';
import {useGetProducts} from '../api/useGetProducts';
import {useOrderCreate} from '../api/useOrderCreate';

const OrderForm = () => {
  const [userId, setUserId] = useState<number | string>(1);
  const [productId, setProductId] = useState<number | string>(1);  
  const [quantity, setQuantity] = useState<number | string>(1);

  const {products, error, setError} = useGetProducts()
  const {handleSubmit} = useOrderCreate
  ({userId, productId, quantity, setProductId, setQuantity, setError})

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>User id:</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            min="1"
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default OrderForm;
