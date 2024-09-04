import MainMenu from "@/app/components/MainMenu";
import PageTitle from "@/app/components/PageTitle";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Entretien"} />
    </main>
  );
}
