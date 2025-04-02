"use client";

import JobOfferForm from "@/admin/components/JobOfferForm";


export default function Page({ params }) {
  return (
    <main className="w-full mx-auto p-6">
      <JobOfferForm jobOfferId={params.id}/>
    </main>
  );
}
