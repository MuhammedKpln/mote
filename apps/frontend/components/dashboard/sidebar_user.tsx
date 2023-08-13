"use client";
import userPic from "@/public/user.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiChevronsDown } from "react-icons/fi";

export function DashboardSidebarUser() {
  const { data } = useSession();

  return (
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
          <p className="text-white text-sm">{data?.user?.name}</p>
          <p className="text-gray-300 italic text-sm">{data?.user?.email}</p>
        </div>

        <FiChevronsDown className="text-white" />
      </div>
    </div>
  );
}
