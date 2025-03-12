"use client"
import { cn } from "../lib/utils";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconAdCircleOff,
} from "@tabler/icons-react";
import MainMenu from "./../components/MainMenu";
import PageTitle from "./../components/PageTitle";
import Image from "next/image";
import Footer from "./../components/Footer";

export default function Page() {

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Blog"} />
      <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[30rem] my-20">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            date={item.date}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
      <Footer />
    </main>
  );
}

const Skeleton = ( {src} ) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl border border-transparent bg-neutral-200 overflow-hidden relative">
    <Image
      src={src}
      alt="Outils"
      fill
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  </div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton src="/images/outils.jpg" />,
    date: "il y a 2 jours",
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton src="/images/choix.jpg" />,
    date: "il y a 4 jours",
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton src="/images/prestation.jpg" />,
    date: "il y a 5 jours",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton src="/images/versailles.jpg" />,
    date: "il y a 10 jours",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton src="/images/mockup_catalogue_1.jpg" />,
    date: "il y a 12 jours",
    className: "md:col-span-2",
    icon: <IconBoxAlignRightFilled className="h-4 w-4" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton src="/images/sav.jpg" />,
    date: "il y a 20 jours",
    className: "md:col-span-1",
    icon: <IconAdCircleOff className="h-4 w-4" />,
  },
];