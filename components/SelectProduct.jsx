"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DreamProductCategories } from "@/utils/Utils";

import Image from "next/image";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const SelectProduct = ({ session }) => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e);
  };

  const handleProductChange = (e) => {
    setProduct(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          category,
          product,
        }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mt-10 p-4">
        <Image src="/bajaj-finserv.svg" width={300} height={300} alt="Bajaj" />
        <h1 className="w-full text-center text-2xl mt-5">
          Welcome to your Dream Service/Product Selector
        </h1>
        <div className="w-full flex flex-col items-start p-2 mt-5">
          <Label className="my-2">Choose your product</Label>
          <Select className="my-2" onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {DreamProductCategories.categories.map((product) => (
                <SelectItem key={product.id} value={product.key}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {category && (
          <div className="w-full flex flex-col items-start p-2 mt-5">
            <Label className="my-2">Choose your product</Label>
            <Select className="my-2" onValueChange={handleProductChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                {DreamProductCategories.categories
                  .find((prod) => prod.key === category)
                  .products.map((product) => (
                    <SelectItem key={product.id} value={product.key}>
                      {product.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {product && (
          <div className="w-full flex flex-col items-start p-2 mt-5">
            <Button className="w-full gradient_btn" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectProduct;
