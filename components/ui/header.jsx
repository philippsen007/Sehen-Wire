"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);

      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const router = useRouter();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navigateToSection = (id) => {
    if (!isClient) return;

    if (router && window.location.pathname === "/") {
      scrollToSection(id);
    } else if (router) {
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-accent-corfundo text-white py-4 shadow-md z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
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

        {/* Mobile Navigation */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            &#x22EE; {/* Unicode das bolinhas */}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-accent-corfundo shadow-lg rounded-md py-2">
              <button
                onClick={() => {
                  navigateToSection("features");
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => {
                  navigateToSection("technology");
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Tecnologia
              </button>
              <button
                onClick={() => {
                  navigateToSection("contact");
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Contato
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
