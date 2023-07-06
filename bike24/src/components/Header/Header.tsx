"use client";
import CartBadge from "../CartBadge/CartBadge";
import ActiveLink from "../ActiveLink/ActiveLink";

interface HeaderProps {
  quantity: number;
  listItem: { name: string; href: string }[];
}

export default function Header({
  quantity,
  listItem = [
    { name: "Products", href: "/" },
    { name: "My Orders", href: "/orders" },
  ],
}: HeaderProps) {
  return (
    <div className="flex h-24 bg-blue-600 text-white items-center px-4 py-2 justify-between">
      <span className="font-bold text-2xl">BIKE24</span>
      <div className="flex items-center space-x-2">
        <ul className="flex items-center space-x-4">
          {listItem &&
            listItem.map((item, i) => (
              <li key={i}>
                <ActiveLink href={item.href}>{item.name}</ActiveLink>
              </li>
            ))}
        </ul>
        <CartBadge quantity={quantity}></CartBadge>
      </div>
    </div>
  );
}
