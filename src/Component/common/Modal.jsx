import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  disableBackdropClick = false,
  disableEscapeKey = false,
  showCloseButton = true,
  isFullscreen = false,
  size = "md",
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !disableEscapeKey) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [disableEscapeKey, onClose]);

  if (!isOpen && !isAnimating) return null;

  const getSizeClasses = () => {
    if (isFullscreen || size === "fullscreen") return "w-full h-full";
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-4xl";
      default:
        return "max-w-md";
    }
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]"
        onClick={() => {
          if (!disableBackdropClick) onClose();
        }}
      />
      <div
        ref={modalRef}
        className={`transition-all duration-300 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-6 scale-95 opacity-0"
        } ${
          isFullscreen || size === "fullscreen"
            ? "w-full h-full bg-white dark:bg-gray-900"
            : `w-full ${getSizeClasses()} p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800`
        } relative z-10 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-5">
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
