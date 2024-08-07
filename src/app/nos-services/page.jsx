import MainMenu from "@/app/components/MainMenu";
import Footer from "../components/Footer";
import ServiceCard from "../components/services/serviceCard";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <div className="p-4">
        <h2>
          Nos services pour les <span className="text-or">professionnels</span>{" "}
        </h2>
        <div className="flex items-center justify-between flex-wrap my-12">
          <ServiceCard title="Conseil" />
          <ServiceCard title="Formation" />
          <ServiceCard title="Prestation complète" />
        </div>
        <div className="flex items-center justify-between flex-wrap my-12">
          <ServiceCard title="SAV" />
          <ServiceCard title="CHoix et disponibilité produits" />
          <ServiceCard title="Outils d&apos;aide à la vente" />
        </div>
      </div>
      <Footer />
    </main>
  );
}
