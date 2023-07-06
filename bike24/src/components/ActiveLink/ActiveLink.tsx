import { useRouter } from "next/router";
import { MouseEventHandler, ReactNode } from "react";

interface ActiveLinkProps {
  children?: ReactNode;
  href: string;
}

export default function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter();

  const handleClick = (event: Event | React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.asPath === href ? "font-bold underline" : "font-normal"}
    >
      {children}
    </a>
  );
}
