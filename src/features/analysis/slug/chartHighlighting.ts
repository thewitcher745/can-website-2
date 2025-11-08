import { Article } from "@src/types";

function chartHighlighting(
  contentRef: React.RefObject<HTMLDivElement | null>,
  updates: Article[],
  setModalImgSrc: React.Dispatch<React.SetStateAction<string | null>>,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  return () => {
    if (!contentRef.current) return;

    const container = contentRef.current;
    const images = container.querySelectorAll("article img");

    const cleanupFunctions: (() => void)[] = [];

    images.forEach((img) => {
      const imgElement = img as HTMLElement;

      // Wrap image in a relative container if not already wrapped
      let wrapper = imgElement.parentElement;
      if (!wrapper?.classList.contains("img-overlay-wrapper")) {
        wrapper = document.createElement("div");
        wrapper.classList.add(
          "img-overlay-wrapper",
          "relative",
          "inline-block"
        );
        imgElement.parentNode?.insertBefore(wrapper, imgElement);
        wrapper.appendChild(imgElement);
      }

      // Create overlay
      const overlay = document.createElement("div");
      overlay.classList.add(
        "img-overlay",
        "hidden",
        "absolute",
        "w-full",
        "h-full",
        "left-0",
        "top-0",
        "pointer-events-none",
        "bg-gray-600/60",
        "justify-center",
        "items-center",
        "flex"
      );
      const overlayText = document.createElement("span");
      overlayText.classList.add("text-xl");
      overlayText.innerHTML = "Click to expand.";
      wrapper.appendChild(overlay);
      overlay.appendChild(overlayText);

      // Event handlers
      const handleClick = (event: Event) => {
        setModalImgSrc((event?.target as HTMLElement).getAttribute("src"));
        setModalVisible(true);
      };

      const handleMouseEnter = () => {
        overlay.classList.remove("hidden");
        overlay.classList.add("block");
      };

      const handleMouseLeave = () => {
        overlay.classList.add("hidden");
        overlay.classList.remove("block");
      };

      // Add listeners
      imgElement.addEventListener("click", handleClick);
      imgElement.addEventListener("mouseenter", handleMouseEnter);
      imgElement.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup function
      cleanupFunctions.push(() => {
        imgElement.removeEventListener("click", handleClick);
        imgElement.removeEventListener("mouseenter", handleMouseEnter);
        imgElement.removeEventListener("mouseleave", handleMouseLeave);
        overlay.remove();
      });
    });

    // Cleanup function
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  };
}

export default chartHighlighting;
