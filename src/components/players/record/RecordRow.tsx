interface RecordRowProps {
  label: string;
  children: React.ReactNode;
}

const RecordRow = ({ label, children }: RecordRowProps) => {
  return (
    <div className="bg-card grid grid-cols-3 items-start border-b-2 border-accent px-4 py-3">
      <p className="text-large font-semibold uppercase text-start">{label}:</p>

      <div className="col-span-2 text-large font-medium text-start">
        {children}
      </div>
    </div>
  );
};

export default RecordRow;
