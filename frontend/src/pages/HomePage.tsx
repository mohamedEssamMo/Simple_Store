import {Link} from "react-router-dom";
import {useProductStore} from "../contexts/product";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  
  return (

    <section className="home-page mt-5 text-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent capitalize text-center">current Products </h1>
      <div className="grid grid-cols-4 gap-4 my-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length == 0 &&  <p className="text-gray-500 my-3 capitalize mt-4">No products found 😑 
        <Link to="/create">
          <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent border-b-2 border-transparent hover:border-pink-500 transition-all duration-300">
            create a product.
          </span>
        </Link>
      </p>}

    </section>
  )
}

export default HomePage