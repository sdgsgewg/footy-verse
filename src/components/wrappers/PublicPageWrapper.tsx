interface Props {
  children: React.ReactNode;
}

export default function PublicPageWrapper({ children }: Props) {
  return (
    <div className="container mx-auto py-4 px-4 space-y-6">{children}</div>
  );
}
