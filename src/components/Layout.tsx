import React from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
  className="
    min-h-screen flex flex-col text-foreground
    bg-[url('/your-bg.jpg')] 
    bg-no-repeat bg-center
    bg-cover              /* default: cover screen */
    sm:bg-contain sm:bg-top /* on small screens: fit image */
  "
>
  {/* Navbar */}
  <Navigation />

  {/* Main content */}
  <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
    {children}
  </main>

  {/* Footer */}
  <footer className="bg-card text-muted-foreground text-center py-4 mt-auto">
    &copy; {new Date().getFullYear()} Saathi. All rights reserved.
  </footer>
</div>

  );
};

export default Layout;
