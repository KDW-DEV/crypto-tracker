import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Sidebar from "react-sidebar";
import SearchForm from "./tracking-components/SearchForm";
import CoinSearchResults from "./tracking-components/CoinSearchResults";
import { ListGroup } from "reactstrap";
import CoinCard from "./tracking-components/CoinCard";

const mql = window.matchMedia(`(min-width: 800px)`);

const Dashboard = ({ user, setUser }) => {
  let [coins, setCoins] = useState([]);
  let [tracking, setTracking] = useState([]);

  const url = "https://api.coinranking.com/v1/public/coins";

  useEffect(() => {
    axios.get(url).then(function (response) {
      setCoins(response.data.data.coins); //Acquire top 50 coins to populate the sidebar
    });
  }, []);

  const onSubmit = (data) => {
    axios
      .get(
        `https://api.coinranking.com/v1/public/coins?prefix=${data.searchCoins}`,
      )
      .then((response) => setCoins(response.data.data.coins));
  };

  function trackCoin(e) {
    console.log(e.target.getAttribute("data-id"));
    let coinID = e.target.getAttribute("data-id");
    axios
      .get(`https://api.coinranking.com/v1/public/coin/${coinID}`)
      .then(function (response) {
        console.log(response);
        let trackee = response.data.data.coin;
        trackee.isViewed = false;
        setTracking([...tracking, trackee]);
        console.log(trackee);
      });
  }

  function removeCoin(id) {
    console.log(tracking);
    let removeId = tracking.findIndex((trackee) => trackee.id == id);
    let updatedTracking = tracking;
    updatedTracking.splice(removeId, 1);
    setTracking([...updatedTracking]);
    console.log(updatedTracking);
  }

  const handleMe = (e) => {
    axios.get("/users/me").then((resp) => console.log(resp));
  };
  const handleLogout = (e) => {
    setUser();
    localStorage.removeItem("user");
    axios.post("/users/me/logout").then((resp) => console.log(resp));
  };
  const handleLogoutAll = (e) => {
    setUser();
    localStorage.removeItem("user");
    axios.post("/users/me/logoutall").then((resp) => console.log(resp));
  };

  console.log(user);

  return (
    <Container className="dashBoard">
      <Sidebar
        sidebar={
          <div>
            <SearchForm submit={onSubmit} />{" "}
            <CoinSearchResults track={trackCoin} coinList={coins} />
          </div>
        }
        open={true}
        docked={true}
      >
        <div className="logbuttons">
          <Button className="logbutton" onClick={handleLogout}>
            Log out
          </Button>
          <Button className="logbutton" onClick={handleLogoutAll}>
            Log out All
          </Button>
        </div>
        <div className="content">
          <h1>Crypto Tracker</h1>
          <hr />
          <div className="trackingList">
            <ListGroup variant="flush">
              {tracking &&
                tracking.map((trackee) => (
                  <CoinCard
                    key={Math.random()}
                    data={trackee}
                    remove={removeCoin}
                  />
                ))}
            </ListGroup>
          </div>
        </div>
      </Sidebar>
    </Container>
  );
};

export default Dashboard;
