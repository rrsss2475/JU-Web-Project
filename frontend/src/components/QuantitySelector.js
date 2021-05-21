import React from "react";
import { Button } from "react-bootstrap";

const QuantitySelector = ({
  qty,
  addQtyHandler,
  subQtyHandler,
  limit,
  disabled,
}) => {
  let subButton = (
    <Button
      variant="warning"
      style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
      onClick={subQtyHandler}
    >
      -
    </Button>
  );

  if (qty == 1 || disabled) {
    subButton = (
      <Button
        disabled
        variant="warning"
        style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
        onClick={subQtyHandler}
      >
        -
      </Button>
    );
  }

  let addButton = (
    <Button
      variant="warning"
      style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
      onClick={addQtyHandler}
    >
      +
    </Button>
  );

  if (qty === limit || disabled) {
    addButton = (
      <Button
        disabled
        variant="warning"
        style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
        onClick={addQtyHandler}
      >
        +
      </Button>
    );
  }

  return (
    <div>
      <b>Qty:</b>
      {subButton}
      {qty}
      {addButton}
    </div>
  );
};

export default QuantitySelector;
