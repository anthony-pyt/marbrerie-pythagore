import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Slider = ({ principal_image, images = [] }) => {
  // Fusionner l'image principale avec les autres images pour ne rien oublier
  const allImages = principal_image
    ? [{ image_url: principal_image }, ...images]
    : images;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          arrows: true,
          pagination: true,
          rewind: true,
          // On définit une hauteur fixe, mais on laisse le CSS gérer le remplissage
          fixedHeight: "450px",
          // Désactiver 'cover' de Splide si on gère l'image manuellement en CSS
          // pour éviter les conflits de rendu
          cover: false,
          breakpoints: {
            768: { fixedHeight: "300px" },
          },
        }}
        aria-label="Photos du produit"
      >
        {allImages.map((image, index) => (
          <SplideSlide key={index}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img
                src={image.image_url}
                alt={`Image ${index + 1}`}
                // 'object-cover' remplit le cadre en recoupant l'image sans la déformer
                // 'w-full h-full' assure que l'image occupe tout l'espace du slide
                className="w-full h-full object-cover block"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Slider;
