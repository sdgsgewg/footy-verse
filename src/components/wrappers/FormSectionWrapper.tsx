type FormSize = "small" | "medium" | "large";

interface Props {
  formSize: FormSize;
  children: React.ReactNode;
}

export default function FormSectionLayout({ formSize, children }: Props) {
  const getGridClassName = (formSize: FormSize) => {
    switch (formSize) {
      case "small":
        return `lg:col-span-6 lg:col-start-4`;
      case "medium":
        return `lg:col-span-8 lg:col-start-3`;
      case "large":
        return ``;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className={`col-span-12 ${getGridClassName(formSize)}`}>
        {children}
      </div>
    </div>
  );
}
