import React from "react";
import closeBtn from "../../asset/close-btn.svg";

const Window: React.FC<{ closeFunc: () => void }> = ({
  children,
  closeFunc,
}) => {
  return (
    <div className="Window">
      <div className="content-box">
        <img src={closeBtn} alt="" onClick={closeFunc} className="close-btn" />
        {children}
      </div>
    </div>
  );
};

export default Window;
