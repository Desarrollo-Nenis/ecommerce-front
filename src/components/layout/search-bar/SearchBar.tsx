"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartDropdown from "../cart/cart-dropdown/cart-dropdown";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      router.push(`/s/${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div className="ml-auto flex items-center">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center gap-2 mr-4 w-[200px] lg:w-[300px]"
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
      </form>

      <CartDropdown />
    </div>
  );
};
