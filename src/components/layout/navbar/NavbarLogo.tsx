import { IMAGES } from "@/constants/images";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/navigation";
import Image from "next/image";
import React from "react";

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <div
        className="rounded-md shadow-md flex justify-center overflow-hidden"
        style={{ width: "100%", height: "30px" }}
      >
        <Image
          src={IMAGES.COMMON.LOGO}
          alt="Teams"
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
      </div>
      <Link
        href={ROUTES.HOME}
        className="font-bold text-lg text-primary block ms-3"
      >
        FootyVerse
      </Link>
    </div>
  );
};

export default NavbarLogo;
