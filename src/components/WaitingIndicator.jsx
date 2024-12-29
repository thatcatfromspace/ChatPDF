import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function WaitingIndicator() {
  return (
    <div className="w-full px-11">
      <SkeletonTheme>
        <p>
          <Skeleton count={3} />
        </p>
      </SkeletonTheme>
    </div>
  );
}

export default WaitingIndicator;
