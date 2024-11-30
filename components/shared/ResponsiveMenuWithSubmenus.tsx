"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const ResponsiveMenuWithSubmenus = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>(
    {}
  ); // Submenu toggle

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (menu: string) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const MENU_ITEMS = [
    { title: "Home", link: "/" },
    {
      title: "Categories",
      submenus: [
        { title: "Clothes", submenus: ["Men", "Women", "Kids"] },
        { title: "Accessories", submenus: ["Jewelry", "Shoes", "Bags"] },
      ],
    },
    { title: "Occasions", link: "/occasions" },
    { title: "Trending", link: "/trending" },
    { title: "Contact Us", link: "/contact" },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <p className="text-lg font-bold">MyLogo</p>
            </Link>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white hover:text-gray-400 focus:outline-none"
            >
              {isOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>

          {/* Menu Items (Desktop) */}
          <div className="hidden lg:flex space-x-8">
            {MENU_ITEMS.map((item, index) => (
              <div key={index} className="relative group">
                <Link href={item.link || "#"}>
                  <p className="hover:text-gray-400">{item.title}</p>
                </Link>
                {/* Desktop Submenu */}
                {item.submenus && (
                  <div className="absolute hidden group-hover:block bg-gray-700 text-sm py-2 rounded shadow-lg mt-2">
                    {item.submenus.map((submenu: any, i: number) => (
                      <div key={i} className="px-4 py-2 hover:bg-gray-600">
                        {typeof submenu === "string" ? (
                          <Link href="#">
                            <p>{submenu}</p>
                          </Link>
                        ) : (
                          <>
                            <p className="font-bold">{submenu.title}</p>
                            <ul className="pl-4">
                              {submenu.submenus.map((sub: any, j: number) => (
                                <li key={j} className="py-1">
                                  <Link href="#">
                                    <p className="hover:text-gray-300">{sub}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-700">
          <ul className="space-y-4 px-4 py-4">
            {MENU_ITEMS.map((item, index) => (
              <li key={index}>
                <div>
                  <div className="flex justify-between">
                    <Link href={item.link || "#"}>
                      <p onClick={() => setIsOpen(false)}>{item.title}</p>
                    </Link>
                    {item.submenus && (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="text-gray-400"
                      >
                        {submenuOpen[item.title] ? "-" : "+"}
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu */}
                  {submenuOpen[item.title] && item.submenus && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {item.submenus.map((submenu: any, i: number) => (
                        <li key={i}>
                          {typeof submenu === "string" ? (
                            <Link href="#">
                              <p>{submenu}</p>
                            </Link>
                          ) : (
                            <>
                              <p className="font-bold">{submenu.title}</p>
                              <ul className="pl-4">
                                {submenu.submenus.map((sub: any, j: number) => (
                                  <li key={j} className="py-1">
                                    <Link href="#">
                                      <p>{sub}</p>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveMenuWithSubmenus;
