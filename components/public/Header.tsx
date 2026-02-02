"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Wrench } from "lucide-react";

interface HeaderProps {
  onAppointmentClick: () => void;
  onQuoteClick: () => void;
}

const Header = ({ onAppointmentClick, onQuoteClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "/realisations", label: "Réalisations", isRoute: true },
    { href: "#zones", label: "Zones" },
    { href: "#avis", label: "Avis" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "header-glass shadow-sm" : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="logo">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-slate-900">Plombier Orléans</span>
              <span className="block text-xs text-slate-500">Dépannage & Entretien</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={pathname === "/" ? link.href : `/${link.href}`}
                  className="text-slate-600 hover:text-primary font-medium transition-colors"
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0238000000" className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">02 38 00 00 00</span>
            </a>
            <Button
              onClick={onAppointmentClick}
              className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 btn-lift"
              data-testid="header-appointment-btn"
            >
              Urgence 24h/24
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4" data-testid="mobile-menu">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium px-4 py-2 ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-slate-600 hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={pathname === "/" ? link.href : `/${link.href}`}
                    className="text-slate-600 hover:text-primary font-medium px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="px-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a href="tel:0238000000" className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">02 38 00 00 00</span>
                </a>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAppointmentClick();
                  }}
                  className="bg-secondary hover:bg-secondary/90 text-white rounded-full"
                  data-testid="mobile-appointment-btn"
                >
                  Urgence 24h/24
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
