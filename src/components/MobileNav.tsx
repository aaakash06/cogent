"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, Newspaper, BadgePlus, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

const menuItems = [
  { icon: Newspaper, label: "Blog", href: "/" },
  { icon: BadgePlus, label: "Create", href: "/create" },
];

const menuItemsOut = [
  { icon: LogIn, label: "Login", href: "/sign-in" },

  { icon: LogOut, label: "Register", href: "/sign-up" },
];

export default function ResponsiveSidebar() {
  const { isSignedIn } = useAuth();
  const SidebarContent = () => (
    <ScrollArea className="h-full py-6 pl-6 pr-6 lg:pr-0">
      <h2 className="mb-4 text-lg font-semibold">Menu</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            onClick={closeSidebar}
            variant="ghost"
            className="justify-start"
          >
            <item.icon className="mr-2 h-4 w-4" />
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
        {!isSignedIn &&
          menuItemsOut.map((item, index) => (
            <Button
              key={index}
              onClick={closeSidebar}
              variant="ghost"
              className="justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
      </nav>
    </ScrollArea>
  );
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <div className={`absolute h-screen sm:hidden `}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-5 z-40 lg:hidden"
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}
