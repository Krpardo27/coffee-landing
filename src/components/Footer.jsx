import React from "react";

const links = [
  { name: "Privacy Policy", href: "#", icon: "privacy" },
  { name: "Terms of Service", href: "#", icon: "terms" },
  { name: "Contact Us", href: "#", icon: "contact" },
];

const Footer = () => {
  return (
    <footer className="w-screen py-12 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 lg:flex-row">
        <p className="text-center text-md font-light lg:text-left">
          &copy; {new Date().getFullYear()} Café Cafecito uwu. All rights
          reserved.
        </p>

        <div className="flex justify-center gap-4 lg:justify-start">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
