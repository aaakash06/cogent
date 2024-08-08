"use client";
import { dummyAction } from "@/database/actions.db";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      hello
      <button
        onClick={() => {
          dummyAction();
        }}
      >
        click
      </button>
    </div>
  );
}
