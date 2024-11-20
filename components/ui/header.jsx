"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const router = useRouter();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navigateToSection = (id) => {
    if (!isClient) return; // Garante que só executa no cliente

    if (router && window.location.pathname === "/") {
      scrollToSection(id);
    } else if (router) {
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-accent-corfundo text-white py-4 shadow-md z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="/logosehen.png"
              alt="SehenWire logo"
              width={40}
              height={40}
              className="object-cover"
            />
            <span className="text-xl font-bold">SehenWire</span>
          </div>
        </Link>
        <nav className="flex flex-wrap justify-end space-x-4">
          <button
            onClick={() => navigateToSection("features")}
            className="text-white hover:underline"
          >
            Funcionalidades
          </button>
          <button
            onClick={() => navigateToSection("technology")}
            className="text-white hover:underline"
          >
            Tecnologia
          </button>
          <button
            onClick={() => navigateToSection("contact")}
            className="text-white hover:underline"
          >
            Contato
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
