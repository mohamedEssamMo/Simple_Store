import { useState } from 'react';
import { useProductStore } from '../contexts/product.ts';
import { toast } from 'react-toastify';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '', 
    description: '',
    image: ''
  });

  const {createProduct} = useProductStore();
  const handleProduct = async() => {
    const productData = {
      ...newProduct,
      price: Number(newProduct.price), 
    };
    const { success, message } = await createProduct(productData);
    toast(message, { type: success ? 'success' : 'error' });
    if (success) {
      setNewProduct({
        name: '',
        price: '', 
        description: '',
        image: ''
      });
    }
  };

  return (
    <section className="create-page text-center mt-5">
      <h1 className="font-bold capitalize text-4xl">Create New Product</h1>
      <div className="add-product dark:bg-gray-800 bg-gray-50 flex flex-col gap-2.5 p-5 mt-15 max-w-[500px] mx-auto rounded-2xl">
        <input
          type="text"
          value={newProduct.name}
          className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
          required
          placeholder="Product Name"
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          value={newProduct.description}
          className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
          required
          maxLength={500}
          placeholder="Product Description"
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          title={newProduct.description}
        />
        <input
          type="number"
          value={newProduct.price}
          className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
          required
          placeholder="Price"
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          value={newProduct.image}
          className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
          required
          placeholder="Image URL"
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          title={newProduct.image}
        />
        <button
          className="w-full rounded bg-blue-500 text-white hover:bg-blue-600 transition p-2"
          onClick={handleProduct}
        >
          Add New Product
        </button>
      </div>
    </section>
  );
};

export default CreatePage;
