import React, { useState, useEffect } from 'react';

export default function NavContainer({click, page, pages, addPage}) {

  const renderList = () => {
    const menuList = [];
    for (const comp of pages) {
      menuList.push(<a className={comp} onClick={() => click(comp)} key={comp}>{comp}</a>)
    }
    return menuList;
  }

  useEffect(() => renderList(), [])

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">{page}</button>
        <div className="dropdown-content">
          {renderList()}
        </div>
      </div>
      <span>
        <input placeholder="Enter page title" className='pageNameInput'></input>
        <button className='addPageBtn' onClick={() => addPage(document.getElementsByClassName("pageNameInput")[0].value)}>Add page</button>
      </span>
    </div>
  );
}