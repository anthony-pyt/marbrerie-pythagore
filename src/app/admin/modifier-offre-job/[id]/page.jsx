"use client";

import JobOfferForm from "@/admin/components/JobOfferForm";
import { use } from "react";


export default function Page({ params }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
  return (
    <main className="w-full mx-auto p-6">
      <JobOfferForm jobOfferId={id}/>
    </main>
  );
}
