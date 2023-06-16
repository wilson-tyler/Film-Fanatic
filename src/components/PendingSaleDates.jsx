import React, { useState, useEffect } from 'react';
import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "../App.scss";

export default function PendingSaleDates() {
  const [people, setPeople] = useState([]);

  const getPeople = () => setPeople([
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
  ]);
  
  const getColumns = () => [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 }
  ];
  
  const headerRow = {
    rowId: "header",
    cells: [
      { type: "header", text: "Name" },
      { type: "header", text: "Surname" }
    ]
  };
  
  const getRows = (people) => [
    headerRow,
    ...people.map((person, idx) => ({
      rowId: idx,
      cells: [
        { type: "text", text: person.name },
        { type: "text", text: person.surname }
      ]
    }))
  ];

  const applyChangesToPeople = ( changes, prevPeople ) => {
    changes.forEach((change) => {
      const personIndex = change.rowId;
      const fieldName = change.columnId;
      prevPeople[personIndex][fieldName] = change.newCell.text;
    });
    return [...prevPeople];
  };

  const handleChanges = (changes) => { 
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople)); 
  }; 
  
    const rows = getRows(people);
    const columns = getColumns();

    useEffect(() => getPeople(), [])
  
    return (
    <div>
      <div className='pageTitle'>PENDING SALE DATES</div>
      <br></br>
        <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges}/>
    </div>
  );
  }