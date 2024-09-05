"use client";
import { useParams, useSearchParams } from "next/navigation";
import MainMenu from "@/app/components/MainMenu";
import PageTitle from "@/app/components/PageTitle";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState(null);
   const searchParams = useSearchParams();

   const label = searchParams.get("label");
   const id = searchParams.get("id");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stock/products/${id}`
        );
        const resultat = await response.json();
       setProduct(resultat)
        
      } catch (error) {}
    };
    fetchProduct();
  }, []);

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={product?.label} />
    </main>
  );
}
