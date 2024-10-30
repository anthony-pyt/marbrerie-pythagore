import MainMenu from "./../components/MainMenu";
import PageTitle from "./../components/PageTitle";

export default function Page() {

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={'Blog'} />
    </main>
  );
}
