"use client";

const PageTitle = ({ title }) => {
  const number = Math.floor(Math.random() * 10) + 1;

  return (
    <div
      className="relative bg-white border rounded-xl overflow-hidden parallax h-48 flex items-center justify-center"
      style={{ backgroundImage: `url('/images/wave-${number}.png')` }}
    >
      <h1 className="relative p-4 text-center text-secondary text-3xl md:text-6xl parallax-title animate__animated animate__bounceInLeft">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
