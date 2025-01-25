import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* Display a loading skeleton until response from server arrives. */
function WaitingIndicator() {
  return (
    <div className="flex items-start">
      <div>
        <img src="/robot.png" alt="bot-logo" className="h-8 w-8" />
      </div>
      <div className="w-full px-4">
        <SkeletonTheme>
          <p>
            {/* using <p> tag because it occupies the entire width by default */}
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default WaitingIndicator;
