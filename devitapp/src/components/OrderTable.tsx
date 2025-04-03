import { useState } from 'react';
import { useGetOrders } from '../api/useGetOrders';

const OrderTable = () => {
  const [userId, setUserId] = useState<number | string>(1);
  const {orders, error} = useGetOrders({userId})

  return (
    <div>
      <h2>Orders</h2>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.product.name}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderTable;
