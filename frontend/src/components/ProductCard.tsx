import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { useProductStore } from "../contexts/product";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();

  const [updateProductData, setUpdateProductData] = useState<Product>({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    _id: product._id,
  });

  const onDelete = async () => {
    const { success, message } = await deleteProduct(product._id!);
    toast(message, { type: success ? "success" : "error" });
  };

  const onEdit = async () => {
    const { success, message } = await updateProduct(product._id!, updateProductData);
    toast(message, { type: success ? "success" : "error" });
  };

  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all hover:scale-[1.02]">
      <div className="relative w-full h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-gray-900/80 dark:bg-gray-800/80 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
          ${product.price}
        </div>
      </div>

      <CardContent className="p-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-start gap-3 items-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-50 hover:bg-blue-500 hover:text-white"
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          </DialogTrigger>

          <DialogContent className="dark:bg-gray-800 bg-gray-50 w-full rounded-2xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>

            <div className="update-product dark:bg-gray-800 bg-gray-50 flex flex-col gap-2.5 p-5 w-full mx-auto rounded-2xl">
              <input
                type="text"
                value={updateProductData.name}
                className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
                placeholder="Product Name"
                onChange={(e) =>
                  setUpdateProductData({ ...updateProductData, name: e.target.value })
                }
              />
              <input
                type="text"
                value={updateProductData.description}
                className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
                maxLength={500}
                placeholder="Product Description"
                onChange={(e) =>
                  setUpdateProductData({ ...updateProductData, description: e.target.value })
                }
              />
              <input
                type="number"
                value={updateProductData.price}
                className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
                placeholder="Price"
                onChange={(e) =>
                  setUpdateProductData({
                    ...updateProductData,
                    price: Number(e.target.value),
                  })
                }
              />
              <input
                type="text"
                value={updateProductData.image}
                className="outline-none border-2 border-gray-500 focus:border-blue-600 p-2 rounded"
                placeholder="Image URL"
                onChange={(e) =>
                  setUpdateProductData({ ...updateProductData, image: e.target.value })
                }
              />

              <div className="flex gap-3 ml-auto">
                <DialogClose asChild>
                  <Button
                    onClick={onEdit}
                    className="bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Save
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          onClick={onDelete}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
