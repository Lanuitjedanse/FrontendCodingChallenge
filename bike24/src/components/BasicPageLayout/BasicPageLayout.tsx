import "@/app/globals.css";
import Header from "@/components/Header/Header";
import { useRouter, NextRouter } from "next/router";

interface BasicPageLayout {
  router: NextRouter;
  quantity: number;
  children: React.ReactNode;
}

export default function BasicPageLayout({
  quantity,
  children,
}: BasicPageLayout) {
  const router = useRouter();

  return (
    <>
      <Header router={router} quantity={quantity}></Header>
      <div className="flex flex-col h-full w-full items-center mt-18">
        {children}
      </div>
    </>
  );
}
