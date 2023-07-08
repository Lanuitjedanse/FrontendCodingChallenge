"use Client";
import { NextRouter } from "next/router";
import { ReactNode } from "react";

interface ActiveLinkProps {
  children?: ReactNode;
  href: string;
  router: NextRouter;
}

export default function ActiveLink({
  children,
  href,
  router,
}: ActiveLinkProps) {
  const handleClick = (event: Event | React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.asPath === href ? "font-bold" : "font-normal"}
    >
      {children}
    </a>
  );
}
