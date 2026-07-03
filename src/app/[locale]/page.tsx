"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export default function Home() {
//   const router = useRouter();
//   const locale = useLocale();

//   useEffect(() => {
//     router.push(`/${locale}/club/arsenal/men/players/`);
//   }, [router]);

//   return <></>;
// }

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <h1>Home</h1>
      </section>
    </div>
  );
}
