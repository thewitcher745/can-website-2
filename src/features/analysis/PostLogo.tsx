import React from "react";
import Image from "next/image";
import { PostLogoProps } from "@src/types";

const PostLogo = ({
  thumbnail,
  altText,
  className = "",
  hiddenOnMobile = false,
}: PostLogoProps) => {
  if (!thumbnail?.length)
    return (
      <div
        className={`p-2 w-20 h-20 rounded-full overflow-hidden border border-primary xs:relative m-2 left-0 top-0 translate-x-0 translate-y-0 opacity-100 ${
          hiddenOnMobile ? "hidden sm:block" : ""
        }`}
      >
        <div className="size-full p-2 overflow-hidden rounded-full">
          <Image
            src="/images/logos/can-logo.png"
            alt={altText}
            width={160}
            height={160}
            className="object-contain object-center size-full  scale-140"
          />
        </div>
      </div>
    );

  return (
    <div className={`${className}`}>
      <div
        className={`p-2 w-20 h-20 rounded-full overflow-hidden border border-primary xs:relative m-2 left-0 top-0 translate-x-0 translate-y-0 opacity-100 ${
          hiddenOnMobile ? "hidden sm:block" : ""
        }`}
      >
        <div className="size-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={altText}
            width={160}
            height={160}
            className="object-contain object-center size-full backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PostLogo;
