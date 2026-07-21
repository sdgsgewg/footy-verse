import RecordRow from "./RecordRow";
import { PositionSummary } from "@/types/player";

interface PlayerPositionRecordDataProps {
  mainPosition: PositionSummary;
  otherPositions: PositionSummary[];
}

const PlayerPositionRecordData = ({
  mainPosition,
  otherPositions,
}: PlayerPositionRecordDataProps) => {
  return (
    <RecordRow label="Position">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p>Main Position:</p>
          <p>{mainPosition.name}</p>
        </div>

        {otherPositions.length > 0 && (
          <div>
            <p>Other Positions:</p>

            {otherPositions.map((op) => (
              <p key={op.id}>{op.name}</p>
            ))}
          </div>
        )}
      </div>
    </RecordRow>
  );
};

export default PlayerPositionRecordData;
