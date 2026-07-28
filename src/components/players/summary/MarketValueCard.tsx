import { Card, CardContent } from "@/components/ui/card";

interface Props {
  value: string;
}

const MarketValueCard = ({ value }: Props) => {
  return (
    <Card className="w-full max-w-72 bg-emerald-500 dark:bg-emerald-700 text-primary">
      <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-6">
        <p className="text-xs uppercase tracking-widest">Market Value</p>

        <p className="text-4xl font-bold">{value}</p>

        <p className="text-xs opacity-80">Latest Value</p>
      </CardContent>
    </Card>
  );
};

export default MarketValueCard;
