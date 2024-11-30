"use client";
import React, { useState } from "react";
import Link from "next/link";

interface DropdownItem {
  title: string;
  link?: string;
  subItems?: DropdownItem[];
}

const MENU_ITEMS: DropdownItem[] = [
  { title: "Home", link: "/" },
  {
    title: "Featured Products",
    subItems: [
      { title: "Trending Products", link: "/trending-products" },
      { title: "New Arrivals", link: "/new-arrivals" },
      { title: "Featured in Deals", link: "/featured-deals" },
    ],
  },
  {
    title: "Categories",
    subItems: [
      {
        title: "Clothes",
        subItems: [
          {
            title: "Women",
            subItems: [
              { title: "Abayas & Modest Wear", link: "/clothes/women/abayas" },
              { title: "Dresses", link: "/clothes/women/dresses" },
              { title: "Suits", link: "/clothes/women/suits" },
            ],
          },
          {
            title: "Men",
            subItems: [
              { title: "Shirts", link: "/clothes/men/shirts" },
              { title: "Suits", link: "/clothes/men/suits" },
              { title: "Seasonal Wear", link: "/clothes/men/seasonal" },
            ],
          },
          {
            title: "Kids",
            subItems: [
              { title: "Boys", link: "/clothes/kids/boys" },
              { title: "Girls", link: "/clothes/kids/girls" },
              { title: "Babies", link: "/clothes/kids/babies" },
            ],
          },
        ],
      },
      {
        title: "Accessories",
        subItems: [
          {
            title: "Women",
            subItems: [
              { title: "Jewelry", link: "/accessories/women/jewelry" },
              { title: "Handbags", link: "/accessories/women/handbags" },
              { title: "Shoes", link: "/accessories/women/shoes" },
            ],
          },
          {
            title: "Men",
            subItems: [
              { title: "Watches", link: "/accessories/men/watches" },
              { title: "Shoes", link: "/accessories/men/shoes" },
              { title: "Bags", link: "/accessories/men/bags" },
            ],
          },
          {
            title: "Kids",
            subItems: [
              { title: "Hats", link: "/accessories/kids/hats" },
              { title: "Shoes", link: "/accessories/kids/shoes" },
              {
                title: "Diaper Bags (Babies)",
                link: "/accessories/kids/diaper-bags",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Occasions",
    subItems: [
      { title: "Casual Wear", link: "/occasions/casual" },
      { title: "Formal Wear", link: "/occasions/formal" },
      { title: "Party Wear", link: "/occasions/party" },
      { title: "Sports Wear", link: "/occasions/sports" },
      { title: "Work Wear", link: "/occasions/work" },
    ],
  },
  {
    title: "Trending",
    subItems: [
      { title: "Featured in Deals", link: "/trending/featured-deals" },
      { title: "Trending Styles", link: "/trending/styles" },
      { title: "Seasonal Picks", link: "/trending/seasonal" },
    ],
  },
  {
    title: "Customize",
    subItems: [
      { title: "Personalized Products", link: "/customize/personalized" },
      { title: "Customization Options Available", link: "/customize/options" },
    ],
  },
  {
    title: "Sale",
    subItems: [
      { title: "Discounted Items", link: "/sale/discounted" },
      { title: "Clearance Sale", link: "/sale/clearance" },
    ],
  },
  {
    title: "Contact Us",
    subItems: [
      { title: "Customer Support", link: "/contact/support" },
      { title: "Inquiry Form", link: "/contact/inquiry" },
    ],
  },
];

const MenuWithDropdown = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menuTitle: string) => setActiveMenu(menuTitle);
  const handleMouseLeave = () => setActiveMenu(null);

  const renderSubMenu = (items: DropdownItem[]) => (
    <ul className="absolute left-full top-0 mt-0 bg-white shadow-lg w-48">
      {items.map((item) => (
        <li key={item.title} className="relative">
          {item.link ? (
            <Link href={item.link}>
              <p className="block px-4 py-2 hover:bg-gray-200">{item.title}</p>
            </Link>
          ) : (
            <span
              className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              {item.title}
            </span>
          )}
          {item.subItems &&
            activeMenu === item.title &&
            renderSubMenu(item.subItems)}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="bg-gray-800 text-black p-4">
      <ul className="flex space-x-4">
        {MENU_ITEMS.map((item) => (
          <li
            key={item.title}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            {item.link ? (
              <Link href={item.link}>
                <p className="px-4 py-2">{item.title}</p>
              </Link>
            ) : (
              <span className="px-4 py-2 cursor-pointer">{item.title}</span>
            )}
            {item.subItems &&
              activeMenu === item.title &&
              renderSubMenu(item.subItems)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuWithDropdown;
