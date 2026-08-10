"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function CopyrRightMessage() {
  const pathname = usePathname();
  return (
    pathname === "/" && (
      <p className="w-full text-center bg-dealbondhu text-sm text-white p-1">
        Copyright - 2026. DealBondhu. All Rights Reserved.
      </p>
    )
  );
}
