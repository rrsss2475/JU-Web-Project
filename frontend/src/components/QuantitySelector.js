import React  from 'react'
import { Button } from 'react-bootstrap'

const QuantitySelector = ({ qty, addQtyHandler, subQtyHandler, limit }) => {

    let subButton = (
        <Button
            variant="primary"
            style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
            onClick={subQtyHandler}
        >
            -
        </Button>
    );

    if (qty == 1) {
        subButton = (
            <Button
                disabled
                variant="primary"
                style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
                onClick={subQtyHandler}
            >
                -
            </Button>
        );
    }

    let addButton = (
        <Button
            variant="primary"
            style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
            onClick={addQtyHandler}
        >
            +
        </Button>
    );

    if (qty == limit) {
        addButton = (
            <Button
                disabled
                variant="primary"
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
    )
}

export default QuantitySelector
