"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard_header";
import { DashboardSidebar } from "@/components/dashboard/dashboard_sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./dashboard.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(1024);
  const isMobile = useMemo(() => width <= 768, [width]);

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  const closeSidebar = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div id="container" className={styles.container}>
      <AnimatePresence>
        {isMobile ? (
          isOpen && (
            <motion.div
              id="sidebar"
              className={styles.sidebar}
              initial={{ x: "-100%" }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{ type: "tween", duration: 0.1 }}
            >
              <DashboardSidebar />
            </motion.div>
          )
        ) : (
          <div id="sidebar" className={styles.sidebar}>
            <DashboardSidebar />
          </div>
        )}
      </AnimatePresence>
      {isMobile ? (
        <motion.div
          id="content"
          className={styles.content}
          onClick={closeSidebar}
          animate={{
            scale: isOpen ? 0.8 : 1,
            opacity: isOpen ? 0.5 : 1,
          }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <Suspense fallback="Loading..">
            <DashboardHeader showMenuIcon onMenuClick={toggleSidebar} />
          </Suspense>
          <Suspense fallback="Loading..">{children}</Suspense>
        </motion.div>
      ) : (
        <div id="content" className={styles.content}>
          <Suspense fallback="Loading..">
            <DashboardHeader />
          </Suspense>
          <Suspense fallback="Loading..">
            <div className="p-5">{children}</div>
          </Suspense>
        </div>
      )}
    </div>
  );
}
