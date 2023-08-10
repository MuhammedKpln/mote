import { navLinks } from "@/app/utils/navLinks";
import styles from "@/styles/dashboard.module.scss";
import Link from "next/link";
import { FiCloudRain } from "react-icons/fi";

export function DashboardSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div id="logo" className="p-2 mx-5 border w-10 rounded-lg justify-center">
        <Link href="/dashboard">
          <FiCloudRain />
        </Link>
      </div>

      <ul>
        {navLinks.menus.map((menu, index) => (
          <div key={index}>
            <li>
              <ul className="my-2">
                {menu.menus.map((e, index) => (
                  <li key={index}>
                    <Link
                      href={e.href}
                      className="flex w-full align-center leading-none p-5 rounded-lg hover:backdrop-brightness-75"
                      prefetch
                    >
                      {<e.icon className="text-gray-300" />}
                      <span className="pl-2 text-sm text-gray-300">
                        {e.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        ))}
      </ul>
    </aside>
  );
}
