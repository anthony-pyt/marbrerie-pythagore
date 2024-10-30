import PageTitle from "../components/PageTitle";
import MainMenu from "./../components/MainMenu";
import Footer from "../components/Footer";
import Image from 'next/image'
import Cards from '../components/cards/cardComponent';

const knowledgesUnique = [{
  title: 'Un savoir-faire unique, au service de vos projets ',
  image_url: '/images/atelier/savoir-faire.png',
  description: "Pythagore est spécialisé dans le travail de la pierre naturelle, mais également la pierre reconstituée et la céramique. Avec plus de 30 ans d’expérience en Bretagne, nous réalisons des agencements sur mesure pour transformer vos espaces avec passion et savoir-faire. \n" +
    "Les projets sur lesquels nous travaillons sont très diversifiés, allant de la cuisine à la salle de bain, en passant par la table ou l’escalier, et plus encore. \n" +
    "Nous travaillons uniquement avec des matériaux de qualité, soigneusement sélectionnés auprès de nos fournisseurs."

}]
const knowledgesTraditional = [{
  title: 'Un savoir-faire français traditionnel, constamment réinventé',
  image_url: '/images/atelier/savoir-faire-traditionnel.png',
  description: "Chaque jour, l’équipe Pythagore concrétise vos projets les plus créatifs. Notre entreprise a évolué pour s’adapter aux tendances actuelles du marché et aux exigences de nos clients. Nous sommes fiers d’exporter notre savoir-faire unique à travers toute la France, tout en préservant l’héritage de la marbrerie artisanale."

}]
const images = [{
  alt: 'précision pose',
  image_url: "/images/precisions/precision-pose.png"
},
{
  alt: 'précision découpe',
  image_url: "/images/precisions/precision-decoupe.png"
},
{
  alt: 'précision précision',
  image_url: "/images/precisions/precision.png"
}]
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
        <div className="flex flex-col gap-8 ">
          <UniqueKnowlege />
          <TraditionalKnowlege />
          <Precision />
        </div>
        {/* <div>
          <Title title="Finitions de chants" />
          <div className="m-4 ">
            <p>Les finitions de chants sont un aspect essentiel de notre savoir-faire</p>
            <div></div>
          </div>
        </div> */}
      </div>
      <Footer />
    </main>
  );
}
const UniqueKnowlege = () => (
  <div className="pt-24 w-full flex justify-center items-center  mb-8 relative">
    <Cards title={knowledgesUnique[0].title} image={knowledgesUnique[0].image_url}
      description={knowledgesUnique[0].description}
      titleClass="text-2xl w-full px-5"
      desciptionClass="mx-auto p-5"
      cardClass="flex items-start rounded-lg shadow max-w-5xl ite mx-auto max-h-96 gap-8"
      imageContainerClass="container mx-auto"
      imageClass="sm:-ms-24 -mt-24 max-w-96 relative" />
  </div>
)

const TraditionalKnowlege = () => (
  <div className=" w-full flex justify-center items-center  mb-8 relative">
    <Cards title={knowledgesTraditional[0].title} image={knowledgesTraditional[0].image_url}
      description={knowledgesTraditional[0].description}
      titleClass="text-2xl w-full px-5 "
      desciptionClass="mx-auto p-5"
      cardClass="flex flex-row-reverse items-start rounded-lg shadow max-w-5xl ite mx-auto h-96 gap-8"
      imageContainerClass="container mx-auto"
      imageClass="sm:-me-36 mt-28 max-w-96 relative" />
  </div>
)

const Precision = () => (
  <div className="h-full mb-8 pb-5">
    <div className="rounded-lg shadow max-w-5xl ite mx-auto gap-8 flex flex-col mb-6 max-h-96">
      <div className="flex gap-4 p-5 my-5">
        <p> Finitions de chant : chant droit, arrondi, biseauté, bec de corbin…
          Découpe sur mesure : grâce à nos machines de découpe, nous réalisons des découpes précises. Que ce soit pour des arrondis, des angles spécifiques ou des ajustements millimètres, nos collaborateurs mettent tout en œuvre pour garantir un travail de précision.</p>
        <p>
          Joint Parfait : Cette technique permet d’obtenir un résultat visiblement net et continu.

          Pour que votre projet soit réussi dans tous les détails, nous proposons également des façonnages spécifiques comme :
          le polissage sous plan,
          l’assemblage à l’onglet,
          le suivi du mur en pierre...
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((item, index) => (
          <Image src={item.image_url} width={500} height={500} alt={item.alt} key={index} />
        ))}
      </div>
    </div>
  </div>
)