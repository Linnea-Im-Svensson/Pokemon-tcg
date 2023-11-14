import { ReactNode } from "react";

const NavbarTitle = ({ title }: { title: string }) => {
  return <p className="hidden md:block">{title}</p>;
};

export default NavbarTitle;
