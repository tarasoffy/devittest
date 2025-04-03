import axios from "axios";
import { useEffect, useState } from "react";

interface IProduct {
    id: string,
    name: string, 
    price: number,
    stock: number
}

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
      axios.get('http://localhost:3000/api/products')
        .then(response => setProducts(response.data))
        .catch(() => setError('Failed to fetch products'));
    }, []);

    return {
        products,
        error,
        setError
    }
}