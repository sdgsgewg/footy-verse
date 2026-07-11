interface RecordDataProps {
  label: string;
  value?: string | number;
  children?: React.ReactNode;
}

const RecordData = ({ label, value, children }: RecordDataProps) => {
  return (
    <div className="bg-card grid grid-cols-3 items-start border-b-2 border-accent px-5 py-3">
      <p className="text-large font-semibold uppercase text-start">{`${label}:`}</p>

      {/* Kalau ada children, pakai children, kalau tidak pakai value biasa */}
      <div className="text-large font-medium col-span-2 text-start">
        {children ?? value}
      </div>
    </div>
  );
};

export default RecordData;
