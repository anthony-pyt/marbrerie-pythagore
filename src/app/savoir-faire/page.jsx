import PageTitle from "../components/PageTitle";
import MainMenu from "./../components/MainMenu";

const Title = ({ title }) => {
  return (
    <div className="border-b border-or m-4">
      <h3>{title}</h3>
    </div>
  );
};

const Finition = ({ title, img }) => {
  return (
    <div className="border-b border-or m-4">
      <h3>{title}</h3>
    </div>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Notre savoir-faire"} />
      <div className="mt-8">
        <div>
          <Title title="Finitions de chants" />
          <div className="m-4">
            <p>Les finitions de chants sont un aspect essentiel de notre savoir-faire</p>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
