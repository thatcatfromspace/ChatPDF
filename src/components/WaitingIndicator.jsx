import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function WaitingIndicator() {
  return (
    <div className="flex items-start">
      <div>
        <img src="/ai-planet-logo-min.png" alt="bot-logo" className="h-8 w-8" />
      </div>
      <div className="w-full px-4">
        <SkeletonTheme>
          <p>
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default WaitingIndicator;
