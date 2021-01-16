import { Button, Input, Text } from "doodlin-design-system";
import React from "react";
import useAddItem, {
  ECycleType,
  EItemType,
} from "../../hooks/ItemList/AddItem";
import "../../style/ItemList/AddItem.scss";

const AddItem: React.FC = () => {
  const {
    type,
    name,
    price,
    date,
    cycle,
    category,
    remind,
    action: {
      setType,
      setName,
      setPrice,
      setDate,
      setCategory,
      setCycle,
      toggleRemind,
    },
  } = useAddItem();

  return (
    <div className="AddItem">
      <Text size="tit-lg">항목 추가</Text>
      <div className="attr type">
        <div className="label">종류</div>
        <Button
          onClick={() => setType(EItemType.outcome)}
          size="xxs"
          className={`outcome ${type === EItemType.outcome ? "current" : ""}`}
        >
          지출
        </Button>
        <Button
          onClick={() => setType(EItemType.income)}
          size="xxs"
          className={`income ${type === EItemType.income ? "current" : ""}`}
        >
          수입
        </Button>
      </div>
      <div className="attr name">
        <div className="label">이름</div>
        <Input
          value={name}
          inputSize="sm"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div className="attr price">
        <div className="label">가격</div>
        <Input
          type="number"
          value={price}
          inputSize="sm"
          onChange={(e) => setPrice(Number(e.currentTarget.value))}
        />
      </div>
      <div className="attr date">
        <div className="label">시작일</div>
        <Input
          value={date}
          inputSize="sm"
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
      <div className="attr cycle">
        <div className="label">주기</div>
        <Button
          onClick={() => setCycle(ECycleType.month)}
          size="xxs"
          className={`month ${cycle === ECycleType.month ? "current" : ""}`}
        >
          월
        </Button>
        <Button
          onClick={() => setCycle(ECycleType.year)}
          size="xxs"
          className={`year ${cycle === ECycleType.year ? "current" : ""}`}
        >
          년
        </Button>
        <Button
          onClick={() => setCycle(30)}
          size="xxs"
          className={`custom ${typeof cycle === "number" ? "current" : ""}`}
        >
          커스텀
        </Button>
      </div>
      {typeof cycle === "number" && (
        <Input
          inputSize="xxs"
          value={cycle}
          className={`custom-input`}
          onChange={(e) => setCycle(Number(e.currentTarget.value))}
        />
      )}
      <div className="attr category">
        <div className="label">카테고리</div>
        <Input
          value={category}
          inputSize="sm"
          onChange={(e) => setCategory(e.currentTarget.value)}
        />
      </div>
      {type === EItemType.outcome && (
        <div className="attr remind">
          <div className="label">리마인드 여부</div>
          <Button
            rounded
            size="xxs"
            className={`remind-btn ${remind ? "current" : ""}`}
            onClick={toggleRemind}
          />
        </div>
      )}
      <div className={`btn-area`}>
        <Button className="submit-btn" size="sm">
          등록
        </Button>
      </div>
    </div>
  );
};

export default AddItem;
