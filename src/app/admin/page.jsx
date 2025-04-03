"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useBlogServices from "@/api/services/blogServices";
import useJobOffersServices from "@/api/services/jobOffersServices";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { countArticles } = useBlogServices();
  const { countJobOffers } = useJobOffersServices();
  const [count, setCount] = useState({ articles: 0, jobOffers: 0 });
  const [loading, setLoading] = useState({ articles: true, jobOffers: true });
  const router = useRouter();

  useEffect(() => {
    const getNumbers = async () => {
      try {
        // Lance les deux requêtes en parallèle
        const [articlesResponse, offersResponse] = await Promise.allSettled([
          countArticles(),
          countJobOffers(),
        ]);

        // Traite les résultats des articles
        if (articlesResponse.status === "fulfilled") {
          setTimeout(() => {
            setCount((prev) => ({
              ...prev,
              articles: articlesResponse.value.data,
            }));
            setLoading((prev) => ({
              ...prev,
              articles: false,
            }));
            
          }, 1000);
        } else {
          console.error("Erreur articles:", articlesResponse.reason);
          setLoading((prev) => ({
            ...prev,
            articles: false,
          }));
        }

        // Traite les résultats des offres
        if (offersResponse.status === "fulfilled") {
          setCount((prev) => ({
            ...prev,
            jobOffers: offersResponse.value.data,
          }));
          setLoading((prev) => ({
            ...prev,
            jobOffers: false,
          }));
        } else {
          console.error("Erreur offres:", offersResponse.reason);
        }
      } catch (error) {
        console.error("Erreur générale:", error);
        setLoading((prev) => ({
          ...prev,
          jobOffers: false,
        }));
      }
    };

    getNumbers();
  }, []);


  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card
            loading={loading.articles}
            title={"Articles"}
            value={count.articles}
            icon={"mdi:format-list-bulleted"}
            description={"visibles sur le site"}
            url={"/admin/blog/liste-articles"}
          />
          <Card
            loading={loading.jobOffers}
            title={"Jobs"}
            value={count.jobOffers}
            icon={"mdi:format-list-bulleted"}
            description={"annonces en cours de publication"}
            url={"/admin/liste-jobs"}
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

const Skeleton = () => {
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
};

const Card = ({ title, value, description, icon, url, loading }) => {
  return (
    <div className="p-4 rounded-lg border flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {loading ? (
          <div>
            <Icon
              icon="svg-spinners:pulse-rings-3"
              width="24"
              height="24"
              className="text-black"
            />
          </div>
        ) : (
          <p className="text-4xl font-bold">{value}</p>
        )}
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
