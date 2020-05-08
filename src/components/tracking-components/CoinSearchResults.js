import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

const CoinSearchItem = (props) => {
  const coinList = props.coinList;
  const trackCoin = props.track;

  return (
    <ListGroup variant="flush">
      {coinList &&
        coinList.map((coin) => (
          <ListGroupItem
            key={coin.id}
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-between",
            }}
          >
            {coin.name}
            <img
              src={coin.iconUrl}
              height="30px"
              width="30px"
              style={{ marginLeft: "1%", marginRight: "1%" }}
            />
            <div className="trackButtons">
              <Button
                key={coin.id}
                onClick={trackCoin}
                data-id={coin.id}
                className="trackButton"
              >
                Track
              </Button>
            </div>
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

export default CoinSearchItem;
