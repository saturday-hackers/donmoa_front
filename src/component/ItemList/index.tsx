import { Button, Text } from "doodlin-design-system";
import React, { useMemo, useState } from "react";
import Window from "../@common/Window";
import AddItem from "./AddItem";
import "../../style/ItemList/index.scss";
import useItemList from "../../hooks/ItemList";

function ItemList() {
  const { outcomes, incomes } = useItemList();
  const [addPopUp, setAddPopUp] = useState(false);

  const outcomesView = useMemo(() => {
    return outcomes;
  }, [outcomes]);

  const incomesView = useMemo(() => {
    return incomes;
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
          {outcomesView}
        </div>
        <div className="incomes">
          <Text size="tit-md">고정수입 목록</Text>
          {incomesView}
        </div>
      </div>
    </div>
  );
}

export default ItemList;
