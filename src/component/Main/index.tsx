import { Text } from "doodlin-design-system";
import React from "react";
import { priceString } from "dhj-string";

import "../../style/Main/index.scss";
import useMain from "../../hooks/Main";

function Main() {
  const { income, outcome, remain } = useMain();
  return (
    <div className="Main">
      <div className="logo">돈모아</div>
      <div className="content">
        <div className="attr">
          <div className="label">남은 고정 지출</div>
          <Text size="tit-xxxl" className="remain">
            {priceString(remain)}
            <span className="won">원</span>
          </Text>
        </div>
        <div className="attr">
          <div className="label">월별 고정 지출 및 수입</div>
          <Text size="tit-xxl" className="outcome">
            -{priceString(outcome)}
            <span className="won">원</span>
          </Text>
          <Text size="tit-xxl" className="income">
            +{priceString(income)}
            <span className="won">원</span>
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Main;
