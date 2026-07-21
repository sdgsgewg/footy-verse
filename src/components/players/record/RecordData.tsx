import RecordRow from "./RecordRow";

interface RecordDataProps {
  label: string;
  value?: string | number;
}

const RecordData = ({ label, value }: RecordDataProps) => {
  return <RecordRow label={label}>{value}</RecordRow>;
};

export default RecordData;
