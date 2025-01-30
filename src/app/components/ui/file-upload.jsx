import { cn } from "../../../../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 5,
    y: -5,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    const newPreviews = {};

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        newPreviews[file.name] = previewUrl;
      }
    });

    setFilePreviews((prevPreviews) => ({
      ...prevPreviews,
      ...newPreviews,
    }));

    // Cleanup des URL d'aperçu lorsqu'un fichier est supprimé ou changé
    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: false,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const handleRemoveFile = (fileToRemove) => {
    console.log(fileToRemove);
    
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <div className="group relative w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        {/* <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div> */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <p className="font-sans font-bold text-neutral-700">
             <span className="group-hover:bg-or transform duration-500 group-hover:px-2 rounded">Cliquez</span>  ou glissez-déposez pour ajouter un fichier
            </p>
          </div>
          <p className="relative font-sans font-normal text-neutral-400 text-sm mt-2">
            Formats acceptés: .png .jpg .jpeg .pdf
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative bg-white flex flex-col md:flex-row items-center md:items-start justify-start p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow border"
                  )}
                >
                  <div className="mr-4">
                    {file.type.startsWith("image/") &&
                      filePreviews[file.name] && (
                        <div className="mt-2 mb-4 w-full flex justify-center border rounded-xl overflow-hidden">
                          <img
                            src={filePreviews[file.name]}
                            alt={file.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        </div>
                      )}
                  </div>
                  <div className="w-full flex flex-col items-center md:items-start gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-neutral-700 truncate max-w-xs text-xs"
                    >
                      {file.name}
                    </motion.p>
                    <div className="flex items-center">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-gray-100 text-xs"
                      >
                        {file.type}
                      </motion.p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file);
                    }}
                    className="text-red-500 text-sm h-5 w-5 border border-red-500 rounded-full hover:bg-red-500 hover:text-white absolute top-2 right-2
                    flex items-center justify-center bg-white"
                  >
                    <Icon icon="akar-icons:trash-can" className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl bg-white flex items-center justify-center h-24 mt-4 w-full max-w-[12rem] mx-auto rounded-md border border-secondary",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-secondary inset-0 z-30 bg-transparent flex items-center justify-center h-24 mt-4 w-full max-w-[12rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50"
                  : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
