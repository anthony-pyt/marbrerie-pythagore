"use client";

export default function ProductItem({ link }) {
    //TODO Remplacer link par le produit concerné
  return (
    <div>
      <div
        className="rounded-2xl h-[350px] w-[280px] bg-cover bg-center bg-no-repeat shadow-lg mx-4"
        style={{ backgroundImage: `url(${link})` }}
      ></div>
      <div>
        <span className="text-sm border border-or px-2 rounded-xl text-or">
          Xtone
        </span>
      </div>
      <div>
        <span className="uppercase">Ars Beige</span>
      </div>
    </div>
  );
};
