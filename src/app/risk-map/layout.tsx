import React from "react";
import { notFound } from "next/navigation";

// Project imports
import SelectYear from "./client-components/select-year";
import { getYearsList} from "@/app/api/googlesheet/google-sheets";

const getYearsData = async () => {
  const res = await getYearsList();
  return res;
}

export default async function RootLayout({
  children,
}: { children: React.ReactNode}) {

  const years = await getYearsData();

  if (!years) {
    return notFound();
  }

  return (
    <div className="main-container">
      <div className="main-heading">
        <h1>Risk Map</h1>
      </div>
      <SelectYear years={years} />
      {children}
    </div>
  )
}