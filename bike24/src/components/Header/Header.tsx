"use client";
import CartBadge from "../CartBadge/CartBadge";
import ActiveLink from "../ActiveLink/ActiveLink";
import { NextRouter } from "next/router";

interface HeaderProps {
  quantity: number;
  listItem?: { name: string; href: string }[];
  router: NextRouter;
}

export default function Header({
  quantity,
  listItem = [{ name: "My Orders", href: "/orders" }],
  router,
}: HeaderProps) {
  return (
    <div className="fixed w-full flex h-24 bg-blue-600 text-white items-center px-4 py-2 justify-between">
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
        <CartBadge quantity={quantity}></CartBadge>
      </nav>
    </div>
  );
}
