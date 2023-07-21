"use client";

import { useState } from "react";

import { DreamProductCategories } from "@/utils/Utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const SelectProduct = ({ session }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleProductSelect = (product, category) => (e) => {
    setSelectedCategory(category.key);
    setSelectedProduct(product.key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          category: selectedCategory,
          product: selectedProduct,
        }),
      });

      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mt-10 p-4">
        <Image
          priority
          src="/bajaj-finserv.svg"
          width={60}
          height={60}
          alt="Bajaj"
          className="h-auto w-auto"
        />
        <h1 className="w-full text-center text-2xl mt-5">
          Welcome to your Dream Service/Product Selector
        </h1>
        <div className="w-full flex flex-col items-start p-2 mt-5">
          <Label className="my-2">Choose your product</Label>
          <Accordion type="single" collapsible className="w-full">
            {DreamProductCategories.map((category) => (
              <AccordionItem value={category.key} key={category.id}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent className="w-full grid grid-cols-2 gap-1">
                  {category.products.map((product) => (
                    <div key={product.id}>
                      <div
                        className={`w-full flex flex-col items-center justify-center border rounded-md p-1 m-1 ${
                          product.key === selectedProduct
                            ? "border-blue-500 bg-[#131313]"
                            : "border-gray-500"
                        }`}
                        onClick={handleProductSelect(product, category)}
                      >
                        <Image
                          src={product.image}
                          width={70}
                          height={70}
                          className="h-auto w-auto"
                          alt={product.name}
                        />
                        <p className="text-sm text-center">{product.name}</p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {selectedProduct && (
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
