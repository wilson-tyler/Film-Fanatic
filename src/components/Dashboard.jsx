import React, { useState, useEffect } from 'react';
import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "../App.scss";

export default function Dashboard() {
  const [people, setPeople] = useState([]);

  const getPeople = () => setPeople([
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
  ]);
  
  const getColumns = () => [
    { columnId: "name", width: 150, resizable: true },
    { columnId: "surname", width: 150, resizable: true }
  ];

const [columns, setColumns] = useState(getColumns());
  
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

  const handleColumnResize = (ci, width) => {
    setColumns((prevColumns) => {
        const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
        const resizedColumn = prevColumns[columnIndex];
        const updatedColumn = { ...resizedColumn, width };
        prevColumns[columnIndex] = updatedColumn;
        return [...prevColumns];
    });
}
  
    const rows = getRows(people);

    useEffect(() => getPeople(), [])
  
    return (
    <div>
      <div className='pageTitle'>DASHBOARD</div>
      <br></br>
        <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} onColumnResized={handleColumnResize}/>
    </div>
  );
  }