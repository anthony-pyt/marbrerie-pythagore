"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card
            title={"Articles"}
            value={"12"}
            icon={"mdi:format-list-bulleted"}
            description={"visibles sur le site"}
            url={"/admin/blog/liste-articles"}
          />
          <Card
            title={"Jobs"}
            value={"3"}
            icon={"mdi:format-list-bulleted"}
            description={"annonces en cours de publication"}
            url={"/admin/blog/liste-jobs"}
          />
        </div>

        <div className="p-4 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">---------</h2>
          <div className="flex flex-wrap">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Skeleton = () => {
  return (
    <div className="border border-gray-200 p-1 rounded-xl w-[400px] m-1">
      <div className="flex justify-between">
        <div className="h-4 w-36 rounded bg-gray-100 my-1"></div>
        <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="h-4 w-48 rounded bg-gray-100 my-1"></div>
        <div className="h-4 w-48 rounded bg-gray-100 my-1"></div>
        <div className="h-4 w-48 rounded bg-gray-100 my-1"></div>
      </div>
    </div>
  );
}

export const Card = ({ title, value, description, icon, url }) => {
  return (
    <div className="p-4 rounded-lg border flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-xs mt-2">{description}</p>
      </div>
      <div className="h-full flex flex-col justify-between items-end">
        <Icon icon={icon} className="w-8 h-8" />
        <Link
          href={url}
          className="flex items-center space-x-1 border border-transparent hover:border-gray-200 px-1 rounded"
        >
          <span className="text-xs">Voir</span>
          <Icon icon={"mdi:link-variant"} className="w-4 h-6" />
        </Link>
      </div>
    </div>
  );
};
