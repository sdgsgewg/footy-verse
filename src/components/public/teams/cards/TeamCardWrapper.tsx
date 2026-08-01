import React from "react";

export default function TeamCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5`}>
      {children}
    </div>
  );
}
