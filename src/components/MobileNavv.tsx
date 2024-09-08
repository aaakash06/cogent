"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";

const menuItems = [
  { icon: HomeIcon, label: "Home" },
  { icon: UserIcon, label: "Profile" },
  { icon: SettingsIcon, label: "Settings" },
];

export default function ResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const SidebarContent = () => (
    <ScrollArea className="h-full py-6 pl-6 pr-6 lg:pr-0">
      <h2 className="mb-4 text-lg font-semibold">Menu</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Button key={index} variant="ghost" className="justify-start">
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </ScrollArea>
  );

  return (
    <div className="flex h-screen">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed left-4 top-4 z-40 lg:hidden"
            >
              <MenuIcon className="h-4 w-4" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      ) : (
        <aside className="w-64 border-r">
          <SidebarContent />
        </aside>
      )}
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-4">Your main content goes here.</p>
      </main>
    </div>
  );
}
