import { useGlobalState } from "@/client/context/GlobalStateContext";
import React from "react";
import { styles } from "./Error.styles";

const GlobalErrorModal: React.FC = () => {
  const { error, clearError } = useGlobalState();
  const handleClose = () => {
    clearError();
  };

  return (
    <>
      {error && (
        <div className={styles.errorBg}>
          <div className={styles.errorWrapper}>
            <h4 className={styles.h2}>Error</h4>
            <p className={styles.p}>{error}</p>
            <div className={styles.buttonWrapper}>
              <button onClick={handleClose} className="btn btn-danger">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalErrorModal;
