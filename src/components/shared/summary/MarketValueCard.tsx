import { Card, CardContent } from "@/components/ui/card";

interface Props {
  value: string;
  subtitle?: string;
}

const MarketValueCard = ({ value, subtitle = "Latest Value" }: Props) => {
  return (
    <Card className="w-full max-w-72 bg-primary text-primary-foreground shadow-md lg:max-w-54">
      <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-2">
        <p className="text-xs uppercase tracking-widest opacity-80">Market Value</p>

        <p className="text-2xl lg:text-4xl font-bold tracking-tight">{value}</p>

        <p className="text-xs opacity-70">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default MarketValueCard;
