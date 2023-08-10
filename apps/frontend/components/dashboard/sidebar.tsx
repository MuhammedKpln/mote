import { navLinks } from "@/app/utils/navLinks";
import Logo from "@/public/logo.png";
import userPic from "@/public/user.png";
import styles from "@/styles/dashboard.module.scss";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiChevronsDown } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Dashboard",
};

export function DashboardSidebarNew() {
  return (
    <aside className={styles.sidebar}>
      <div id="logo" className="m-5 justify-center">
        <Link href="/dashboard">
          <Image src={Logo} alt="Logo" width={150} height={150} />
        </Link>
      </div>

      <ul className="w-full pl-8">
        {navLinks.menus.map((menu, index) => (
          <li key={index} className="w-full">
            <ul className="my-2">
              {menu.menus.map((e, index) => (
                <li key={index}>
                  <Link
                    href={e.href}
                    className="flex w-full align-center leading-none p-5 rounded-l-2xl hover:backdrop-brightness-90 transition-all"
                    prefetch
                  >
                    {<e.icon id="id" className="text-neutral-300" />}
                    <span className="pl-2 text-sm font-light text-neutral-300">
                      {e.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div
        id="user"
        className="absolute bottom-0 rounded-lg bg-white bg-opacity-20 p-3 m-5 cursor-pointer"
      >
        <div id="wrapper" className="flex flex-1 justify-around">
          <Image
            src={userPic}
            alt="user"
            width={50}
            height={50}
            className="rounded-lg bg-cover w-13"
          />
          <div id="info" className="ml-3 leading-none m-auto">
            <p className="text-white text-sm">Jemka Gasanov</p>
            <p className="text-gray-300 italic text-sm">Apple Designer</p>
          </div>

          <FiChevronsDown className="text-white" />
        </div>
      </div>
    </aside>
  );
}
