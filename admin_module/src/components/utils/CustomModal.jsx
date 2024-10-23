import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import "./css/CustomModal.css";

const CustomModal = ({
  visible,
  onClose,
  title,
  description,
  animationSource,
  primaryButtonText,
  onPrimaryButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isClosing ? "closing" : "opening"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {animationSource && (
          <Lottie
            animationData={animationSource}
            loop={true}
            autoplay={true}
            className="modal-animation"
          />
        )}
        {title && <h2 className="modal-title">{title}</h2>}
        {description && <p className="modal-description">{description}</p>}
        <div className="modal-button-container">
          {primaryButtonText && (
            <button
              className="modal-button primary"
              onClick={onPrimaryButtonPress}
            >
              {primaryButtonText}
            </button>
          )}
          {secondaryButtonText && (
            <button
              className="modal-button secondary"
              onClick={onSecondaryButtonPress}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  animationSource: PropTypes.object.isRequired,
  primaryButtonText: PropTypes.string,
  onPrimaryButtonPress: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  onSecondaryButtonPress: PropTypes.func,
};

export default CustomModal;
