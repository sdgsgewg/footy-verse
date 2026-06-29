// import AudioBubble from "../audio/AudioBubble";
import ScrollToTop from "../ScrollToTop";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <ScrollToTop />

      {/* Audio UI */}
      {/* <AudioBubble /> */}

      {children}
    </div>
  );
};

export default PageWrapper;
