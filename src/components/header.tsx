"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/story_app_icon.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { userId } = useAuth();

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create story",
      href: "/create-story",
    },
    {
      label: "Explore stories",
      href: "/explore",
    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-secondary border-b-1 border-blue-600"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={logo} alt="App logo" width={56} height={56} />
          <p className="font-bold text-primary text-3xl leading-3">
            Tell me a story
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            className="hover:underline ms-2 font-medium text-xl text-primary"
          >
            <Link href={item.href}>{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <UserButton />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/dashboard">
            {userId ? "Dashboard" : "Get Started"}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="hover:underline ms-2 font-medium text-primary"
          >
            <Link className="w-full" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export const AppLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
