import NavItem from "./NavItem";
import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";
import { useSession } from "next-auth/react";
import Logo from "./Logo";

const Navbar = () => {
  const { data: session } = useSession();
  const { headerStyle, headerSize, isNavbarAppointmentBtn, isTextWhite } =
    useHeaderContex();

  const navItemsRaw = [
    {
      name: "Home",
      path: "/",
      dropdown: null,
    },
    {
      name: "Our Story",
      path: "/our-story",
      dropdown: null,
    },
    {
      name: "Shop",
      path: "/shop",
      dropdown: null,
      isNestedDropdown: null,
    },
    {
      name: "Edits",
      path: "/edits",
      dropdown: null,
    },
    {
      name: "Our Promise",
      path: "#",
      dropdown: null,
    },
    {
      name: "Contact",
      path: "/contact",
      dropdown: null,
    },
    ...(session?.user?.roles[0] === "ROLE_ADMIN" ? [{
      name: "Dashboard",
      path: "/bdashboard/product-management",
      dropdown: null,
    }] : [])

  ];
  const navItems = navItemsRaw?.map((navItem, idx) => ({
    ...navItem,
    dropdown: null,
  }));

  return (
    <div
      className={`col header-menu-column ${
        headerStyle === 2 || isTextWhite
          ? " menu-color-white"
          : headerStyle === 5
          ? "justify-content-center align-items-center"
          : ""
      }`}
    >
      {headerStyle === 5 ? <Logo sticky={true} /> : ""}
      <div
        className={`header-menu ${
          headerStyle === 5 ? "header-menu-2" : "d-none d-xl-block "
        } `}
      >
        <nav>
          <div className="ltn__main-menu">
            <ul>
              {navItems?.map((item, idx) => (
                <NavItem key={idx} item={item} />
              ))}
              {isNavbarAppointmentBtn ||
              headerSize === "lg" ||
              headerStyle === 2 ||
              headerStyle === 4 ? (
                <li className="special-link text-uppercase">
                  <Link href="/contact">GET A Quote</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
