import { navLinks } from "@/app/utils/navLinks";
import Link from "next/link";
import { FiCloudRain } from "react-icons/fi";

export function DashboardSidebar() {
  return (
    <aside className="block h-full bg-gray-100 hover:bg-gray-100 p-2 border-r shadow-lg">
      <div id="logo" className="p-2 mx-5 border w-10 rounded-lg justify-center">
        <Link href="/dashboard">
          <FiCloudRain />
        </Link>
      </div>

      <ul className="p-3">
        {navLinks.menus.map((menu) => (
          <>
            <li
              className="text-gray-400 text-sm font-medium p-2"
              key={menu.label}
            >
              {menu.label}
            </li>
            <li>
              <ul className="my-2">
                {menu.menus.map((e) => (
                  <li key={e.label}>
                    <Link
                      href={e.href}
                      className="flex w-full align-center leading-none p-2 rounded-lg hover:bg-gray-200"
                      prefetch
                    >
                      {<e.icon className="text-gray-900" />}
                      <span className="pl-2 text-sm font-medium text-gray-500">
                        {e.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </>
        ))}
      </ul>
    </aside>
  );
}
