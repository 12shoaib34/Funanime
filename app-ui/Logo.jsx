import React from "react";
import { GoDotFill } from "react-icons/go";

const Logo = () => {
  return (
    <h1 className="flex relative mt-2 items-end text-foreground-quaternary text-4xl leading-none ">
      <span className="absolute -top-3 left-0.5 font-bold text-theme-primary text-xl">Fun</span>
      <span className="tracking-wide">
        an
        <span className="text-theme-primary">i</span>
        me
      </span>
      <span className="text-theme-primary -ml-1.5 -primary text-base">
        <GoDotFill />
      </span>
    </h1>
  );
};

export default Logo;
