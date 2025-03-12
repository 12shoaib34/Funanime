import Image from "next/image";
import React from "react";

const AnimeCardVertical = (props) => {
  const { data } = props;

  return (
    <div className="w-full rounded-2xl overflow-hidden relative h-[190px] ">
      <Image objectFit="cover" objectPosition="center" src={data?.image} alt={data?.image} layout="fill" />
      <div className="bg-gradient-to-t from-black/50 to-white/0 absolute bottom-0 left-0 w-full h-full z-10 px-4 py-6 flex items-end">
        <h1 className="text-2xl text-white">{data?.anime}</h1>
      </div>
    </div>
  );
};

export default AnimeCardVertical;
