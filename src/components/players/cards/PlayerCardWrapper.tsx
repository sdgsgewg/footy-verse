import React from "react";

export default function PlayerCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}
    >
      {children}
    </div>
  );
}
