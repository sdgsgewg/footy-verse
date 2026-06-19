"use client";

import Link from "next/link";
import useFixedNavbar from "../../hooks/useFixedNavbar";
import Image from "next/image";
import { ModeToggle } from "../settings/ModeToggle";

const Navbar = () => {
  useFixedNavbar();

  const renderLinks = () => {
    const links = [
      { url: "/nation/indonesia/men/players/", text: "Indonesia" },
      { url: "/club/arsenal/men/players/", text: "Arsenal" },
    ];

    return links.map((link) => (
      <li key={link.url}>
        <Link href={link.url} className="text-primary">
          {link.text}
        </Link>
      </li>
    ));
  };

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10">
      <div className="flex flex-row items-center justify-between w-full relative px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <div
            className="rounded-md shadow-md flex justify-center overflow-hidden"
            style={{ width: "100%", height: "30px" }}
          >
            <Image
              src="https://res.cloudinary.com/db9uk6mya/image/upload/v1740368950/teams_ugow9x.jpg"
              alt="Teams"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <Link href="/" className="font-bold text-lg text-primary block ms-3">
            FootyVerse
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <nav className="flex items-center gap-6">
            <ul className="flex gap-6">{renderLinks()}</ul>
            <div className="flex items-center space-x-2 md:space-x-4">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
