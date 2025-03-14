import { Icon } from "@iconify/react";
import Review from "./Review";
import useGoogleServices from "@/api/services/googleServices";
import { useEffect, useState } from "react";

export default function GoogleReviews() {
  const { getGoogleReviews } = useGoogleServices();
  const [NumberOfReviews, setNumberOfReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const googleLink =
    "https://www.google.com/search?sa=X&sca_esv=bdae0d2953dd278c&tbm=lcl&q=Pythagore+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLa0MDYwMzQwMDUzMzY0NTQ1Md7AyPiKkS-gsiQjMT2_KFXBsSyzeBErmgAAa9LADz0AAAA&rldimm=13983061005663151543&hl=fr-FR&ved=2ahUKEwjg_J6VuImMAxVc2gIHHV2yNZ8Q9fQKegQIRBAF&biw=2560&bih=911&dpr=1#lkt=LocalPoiReviews";

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const response = await getGoogleReviews();
        setAverageRating(response.averageRating);
        setNumberOfReviews(response.totalReviewCount);
        setReviews(response.reviews);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchGoogleReviews();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center my-8">
        <h2 className="text-center">Avis de nos clients</h2>
        <div className="flex items-center space-x-1">
          <span>{averageRating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <Icon
                key={index}
                icon="line-md:star-filled"
                className="text-xl text-or-light"
              />
            ))}
          </div>
          <span>{NumberOfReviews} avis</span>
        </div>
        <div>
            <a href={googleLink} target="_blank"
            className="text-xs hover:underline underline-offset-4">Voir tous les avis</a>
        </div>
      </div>
      <div className="flex items-start justify-evenly flex-wrap">
        {reviews?.map((review) => {
          return (
            <Review
              key={review.reviewId}
              note={review.starRating}
              name={review.reviewer.displayName}
              comment={review.comment}
              date={review.createTime}
              id={review.reviewId}
            />
          );
        })}
      </div>
    </div>
  );
}
