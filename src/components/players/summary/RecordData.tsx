import Image from "next/image";

interface Props {
  label: string;
  content: {
    text: string;
    imageUrl?: string;
  };
}

const RecordData = ({ label, content }: Props) => {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <div className="flex items-center gap-2">
        {content.imageUrl && (
          <Image
            src={content.imageUrl}
            alt={content.text}
            width={20}
            height={14}
            className="rounded-sm border"
          />
        )}

        <span className="font-semibold">{content.text}</span>
      </div>
    </div>
  );
};

export default RecordData;
