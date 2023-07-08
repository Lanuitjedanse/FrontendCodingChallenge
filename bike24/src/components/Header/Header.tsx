"use client";
import CartBadge from "../CartBadge/CartBadge";
import ActiveLink from "../ActiveLink/ActiveLink";
import { NextRouter } from "next/router";

interface HeaderProps {
  quantity: number;
  listItem?: { name: string; href: string }[];
  router: NextRouter;
}

export default function Header({ quantity, listItem, router }: HeaderProps) {
  return (
    <div className="fixed w-full flex h-18 bg-blue-600 text-white items-center px-4 py-2 justify-between z-10">
      <span className="font-bold text-2xl">BIKE24</span>

      <nav className="flex items-center space-x-2">
        <ul className="flex items-center space-x-4">
          {listItem &&
            listItem.map((item, i) => (
              <li key={i}>
                <ActiveLink href={item.href} router={router}>
                  {item.name}
                </ActiveLink>
              </li>
            ))}
        </ul>
        <ActiveLink href="/" router={router}>
          <CartBadge quantity={quantity}></CartBadge>
        </ActiveLink>
      </nav>
    </div>
  );
}
