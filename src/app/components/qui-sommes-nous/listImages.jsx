/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Modal";

const ListImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-wrap justify-start items-center">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="rounded-xl object-cover h-[150px] w-[250px] m-1 border shadow"
              />
            </div>
          </DialogTrigger>
          {selectedImage && (
            <DialogContent className="max-w-3xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-screen h-auto rounded-lg"
              />
              <DialogTitle>
                <p className="text-center mt-2 text-sm text-gray-500">
                  {selectedImage.title}
                </p>
              </DialogTitle>
              <DialogDescription className="sr-only">
                description
              </DialogDescription>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </div>
  );
};

export default ListImages;
