import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const SearchForm = ({ submit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input
        type="search"
        placeholder="Search symbol (BTC)"
        name="searchCoins"
        ref={register}
        style={{ width: "100%" }}
      />

      <input type="submit" style={{ width: "100%" }} />
    </form>
  );
};

export default SearchForm;
