/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Modal";
import { cn } from "@/lib/utils";

const ListImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-wrap gap-4 justify-start items-center py-6">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div
              className="group relative cursor-pointer overflow-hidden border border-gray-100 bg-gray-50 transition-all duration-500 hover:border-or"
              onClick={() => setSelectedImage(image)}
            >
              {/* Overlay subtil au survol */}
              <div className="absolute inset-0 z-10 bg-secondary/0 transition-colors duration-500 group-hover:bg-secondary/10" />

              <img
                src={image.url}
                alt={image.title}
                className="object-cover h-[180px] w-[280px] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Petite ligne Or qui apparaît au survol en bas */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-or transition-all duration-500 group-hover:w-full z-20" />
            </div>
          </DialogTrigger>

          {selectedImage && (
            <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
              <div className="relative group p-1">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[85vh] object-cover rounded-none"
                />

                <DialogTitle className="bg-white py-4">
                  <div className="flex flex-col items-center">
                    <div className="h-[1px] w-8 bg-or mb-2" />
                    <p className="text-center text-[10px] uppercase tracking-[0.3em] text-secondary font-light">
                      {selectedImage.title}
                    </p>
                  </div>
                </DialogTitle>
              </div>

              <DialogDescription className="sr-only">
                Vue détaillée de l&apos;image {selectedImage.title}
              </DialogDescription>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </div>
  );
};

export default ListImages;
