import CompetitionSummary from "@/components/competitions/summary/CompetitionSummary";
import DetailPageLayout from "./DetailPageLayout";
import { CompetitionDetailResponse } from "@/types/competition";
import CompetitionSeasonHistory from "@/components/dashboard/competitions/sections/CompetitionSeasonHistory";

interface Props {
  title: string;
  competition: CompetitionDetailResponse;
  returnTo?: string;
}

const CompetitionDetailPageLayout = ({
  title,
  competition,
  returnTo,
}: Props) => {
  const summary = <CompetitionSummary competition={competition} />;

  const content = (
    <>
      <CompetitionSeasonHistory competition={competition} />
    </>
  );

  return (
    <DetailPageLayout
      title={title}
      summary={summary}
      content={content}
      returnTo={returnTo}
    />
  );
};

export default CompetitionDetailPageLayout;
