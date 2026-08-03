interface Props {
  title: string;
}

const SubsectionHeader = ({ title }: Props) => {
  return (
    <div className="flex items-center bg-secondary px-4 py-1 uppercase mb-1">
      <p className="text-start text-primary-foreground text-lg font-semibold">
        {title}
      </p>
    </div>
  );
};

export default SubsectionHeader;
