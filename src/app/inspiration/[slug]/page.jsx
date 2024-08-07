import MainMenu from "@/app/components/MainMenu";
import { listMenu } from "../../../../mainMenuItems";

export default function Page({ params }) {
    const item = listMenu.find((menu) => menu.slug === "inspiration");
    const page = item.children.find((child) => child.slug === params.slug);
    
  return (
    <main className="min-h-screen">
      <MainMenu />
      <h1>{page.label}</h1>
    </main>
  );
}
