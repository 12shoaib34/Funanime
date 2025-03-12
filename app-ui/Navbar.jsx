import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { MdColorLens } from "react-icons/md";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="bg-bg-secondary">
      <div className="x-container grid grid-cols-12">
        <div className="col-span-2 flex items-center min-h-[64px]">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="col-span-8 hidden lg:block">
          <nav>
            <ul className="flex justify-center gap-12">
              <li>
                <Link className="p-5 block bg-button-primary-bg text-button-primary-text" href="/">
                  Homepage
                </Link>
              </li>
              <li>
                <a className="p-5 block text-foreground-quaternary" href="./categories.html">
                  Categories
                </a>
              </li>
              <li>
                <a className="p-5 block text-foreground-quaternary" href="./blog.html">
                  Our Blog
                </a>
              </li>
              <li>
                <a className="p-5 block text-foreground-quaternary" href="#">
                  Contacts
                </a>
              </li>
              <li>
                <Link className="p-5 flex gap-2" href="theme">
                  <MdColorLens className="text-theme-primary" size={24} /> Theme
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
