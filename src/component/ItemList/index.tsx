import { Button, Text } from "doodlin-design-system";
import React, { useMemo, useState } from "react";
import Window from "../@common/Window";
import AddItem from "./AddItem";
import "../../style/ItemList/index.scss";
import useItemList from "../../hooks/ItemList";
import { EIntervalType } from "../../@api/ItemList/outcomesApi";
import { priceString } from "dhj-string";
import moment from "moment";

function ItemList() {
  const { outcomes, incomes } = useItemList();
  const [addPopUp, setAddPopUp] = useState(false);

  const outcomesView = useMemo(() => {
    return outcomes.map(
      ({
        id,
        started_date,
        name,
        category_name,
        category_id,
        interval_type,
        interval_value,
        price,
        enabled_remind,
      }) => (
        <div className="outcome" key={id}>
          <div className="start-date attr">
            {interval_type === EIntervalType.default
              ? interval_value === 1
                ? `매달 ${moment(started_date).format("D일")}`
                : "일 년 주기"
              : `${interval_value}일 주기`}
          </div>
          <div className="name attr">
            <div className={`category ${category_id}`}>{category_name}</div>
            {name}
          </div>
          <div className="price attr">{priceString(price)}원</div>
          <Button
            size="xxs"
            className={`alarm ${enabled_remind ? "active" : "non_active"}`}
          >
            알람
          </Button>
        </div>
      )
    );
  }, [outcomes]);

  const incomesView = useMemo(() => {
    return incomes.map(
      ({
        id,
        started_date,
        name,
        category_name,
        category_id,
        interval_type,
        interval_value,
        price,
      }) => (
        <div className="income" key={id}>
          <div className="start-date attr">
            {interval_type === EIntervalType.default
              ? interval_value === 1
                ? `매달 ${moment(started_date).format("D일")}`
                : "일 년 주기"
              : `${interval_value}일 주기`}
          </div>
          <div className="name attr">
            <div className={`category ${category_id}`}>{category_name}</div>
            {name}
          </div>
          <div className="price attr">{priceString(price)}원</div>
        </div>
      )
    );
  }, [incomes]);

  return (
    <div className="ItemList">
      {addPopUp && (
        <Window closeFunc={() => setAddPopUp(false)}>
          <AddItem />
        </Window>
      )}
      <div className="content">
        <Button onClick={() => setAddPopUp(true)} className="add-btn" fullWidth>
          새 항목 등록하기 +
        </Button>
        <div className="outcomes">
          <Text size="tit-md">고정지출 목록</Text>
          <div className="contents">{outcomesView}</div>
        </div>
        <div className="incomes">
          <Text size="tit-md">고정수입 목록</Text>
          <div className="contents">{incomesView}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
