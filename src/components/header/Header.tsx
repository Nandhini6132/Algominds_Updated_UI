import Image from "next/image";
import Link from "next/link";
import React from "react";
const logo = require("@/assets/algoMindLogo.png");

const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between mx-10 text-white text-sm">
        <div>
          <Image src={logo} alt="leetcode-logo" width={200} />
        </div>
        <div className="flex grow justify-end gap-5">
          <Link
            href={"/premium"}
            className="hover:bg-yellow-700 px-5 py-2 rounded-2xl text-yellow-500 hover:text-white ease-in duration-300"
          >
            Premium
          </Link>

          <Link
            href={"/sign-in"}
            className="hover:bg-white hover:text-black px-5 py-2 rounded-2xl ease-in duration-300"
          >
            Sign in
          </Link>

          {/* <Link
              href={"/explore"}
              className="hover:bg-white hover:text-black px-5 py-2 rounded-2xl ease-in duration-300"
            >
              Explore
            </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
