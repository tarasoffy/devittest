import axios from "axios";

export const useOrderCreate = ({userId, productId, quantity ,setProductId, setQuantity, setError}: any) => {
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
          await axios.post('http://localhost:3000/api/orders', {
            userId: String(userId),
            productId: String(productId),
            quantity,
          });
          alert('Order created successfully!');
          setProductId('');
          setQuantity(1);
        } catch (err: any) {
          if (err.response) {
            setError(err.response.data.error);
          } else {
            setError('An error occurred while creating the order');
          }
        }
      };

    return {
        handleSubmit
    }
}