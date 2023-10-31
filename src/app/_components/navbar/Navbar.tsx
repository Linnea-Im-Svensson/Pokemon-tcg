import { getServerAuthSession } from "~/server/auth";
import NavbarUl from "./NavbarUl";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed left-0 top-0 h-14 w-full border-b-8 border-black bg-red-400">
      {session && <NavbarUl role={session?.user.role} />}
    </nav>
  );
};

export default Navbar;
