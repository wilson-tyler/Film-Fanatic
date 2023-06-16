import React, { useState, useEffect } from 'react';
import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "../App.scss";
import NavBar from "./NavContainer.jsx"
import Dashboard from '../components/Dashboard';
import Transactions from '../components/Transactions';
import PendingSaleDates from '../components/PendingSaleDates';


export default function HomeContainer() {
  const stockList = ["Dashboard", "Transactions", "Pending Sale Dates", "Appointments", "Buyer Rotation", "Monthly Touches", "PCSOI"];
  const [page, setPage] = useState("Dashboard")
  const [pages, setPages] = useState(stockList);

  let selectedPage;
  if (page === 'Dashboard') {
    selectedPage = <div className="DisplayBox"><Dashboard /></div>;
  } else if (page === 'Transactions') {
    selectedPage = <div className="DisplayBox"><Transactions /></div>;
  } else if (page === 'Pending Sale Dates') {
    selectedPage = <div className="DisplayBox"><PendingSaleDates /></div>;
  }

  const addPages = (newPage) => {
    const pageList = [...pages];
    pageList.push(newPage);
    setPages(pageList);
  }

    return (
    <div>
      <NavBar click={setPage} page={page} pages={pages} addPage={addPages}/>
      <br></br>
      <div>
        {selectedPage}
      </div>
    </div>
  );
}