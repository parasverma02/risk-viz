import Link from "next/link";
import React from "react";

const Header = () => {
  return(
    <header className="p-5 bg-blue-500">
      <Link href='/risk-map' className="px-2 py-2 mx-2 bg-white text-blue-500 rounded-lg">Map</Link>
      <Link href='/risk-table' className="px-2 py-2 mx-2 bg-white text-blue-500 rounded-lg">Table</Link>
      <Link href='/risk-graph' className="px-2 py-2 mx-2 bg-white text-blue-500 rounded-lg">Graph</Link>
    </header>
  )
}

export default Header;