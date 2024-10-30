import MainMenu from "./../components/MainMenu";
import PageTitle from "./../components/PageTitle";
import Image from 'next/image';

const images = [
  {
    alt: 'précision pose',
    image_url: "/images/precisions/precision-pose.png",
    colSpan: 2,
    rowSpan: 2,
    colStart: '',
    colEnd: 6
  },
  {
    alt: 'précision découpe',
    image_url: "/images/precisions/precision-decoupe.png",
    colSpan: 1,
    rowSpan: 1,
    colStart: 2,
    colEnd: 3
  },
  {
    alt: 'précision pose3',
    image_url: "/images/precisions/precision-pose.png",
    colSpan: 3,
    rowSpan: 2,
    colStart: 2,
    colEnd: 4
  },
  {
    alt: 'précision 3',
    image_url: "/images/precisions/precision-decoupe.png",
    colSpan: 3,
    rowSpan: 2,
    colStart: 1,
    colEnd: 7
  },
  {
    alt: 'précision précision',
    image_url: "/images/precisions/precision.png",
    colSpan: 6,
    rowSpan: 4,
    colStart: 1,
    colEnd: 6
  },
  {
    alt: 'précision2',
    image_url: "/images/precisions/precision.png",
    colSpan: 3,
    rowSpan: 1,
    colStart: 3,
    colEnd: 3
  }
];

// Fonction pour mélanger les images
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Page() {
  const shuffledImages = shuffleArray([...images]);

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={'Inspiration'} />
      <GridPage images={shuffledImages} />
    </main>
  );
}

const GridPage = ({ images }) => (
  <div className="container mx-auto mt-8">
    <div className="grid grid-cols-6 gap-4">
      {images.map((item, index) => (
        <div key={index} className={`col-span-${item.colSpan} row-span-${item.rowSpan} (${item.colStart} & col-start-${item.colStart}) col-end-${item.colEnd} relative`}>
          <Image
            src={item.image_url}
            width={item.colSpan * 150} // ajustez la largeur selon votre besoin
            height={item.rowSpan * 150} // ajustez la hauteur selon votre besoin
            alt={item.alt}
            className="object-cover "
          />
        </div>
      ))}
    </div>
  </div>
);
