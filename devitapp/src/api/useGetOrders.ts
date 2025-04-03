import axios from "axios";
import { useEffect, useState } from "react";

interface IProduct {
    id: string,
    name: string, 
    price: number,
    stock: number
}

interface IOrder {
    id: string,
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
    product: IProduct,
    createdAt: string
}

export const useGetOrders = ({userId}: { userId: number|string }) => {    
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState('');

      useEffect(() => {
        axios.get(`http://localhost:3000/api/orders/${userId}`)
          .then(response => setOrders(response.data))
          .catch(() => setError('Failed to fetch orders'));
      }, [userId]);
    
    return {
        orders,
        error
    }
}