import React from "react";
import "../styles/Table.css";

const Table = () => {
  return (
    <div className="table-container">
      <h1 className="table-title">Indicateurs et performances</h1>
      <p className="table-subtitle">*Edition du December 2024</p>
      <div className="table-cards">
        <div className="card">
          <div className="icone">&#128101;</div>
          <h2>3 084 411</h2>
          <p>Bénéficiaires</p>
        </div>
        <div className="card">
          <div className="icone">&#2500;</div>
          <h2>5 750</h2>
          <p>Dossiers validés </p>
        </div>
        <div className="card">
          <div className="icone">&#128187;</div>
          <h2>11</h2>
          <p>Directions</p>
        </div>
        <div className="card">
          <div className="icone">&#128200;</div>
          <h2>13</h2>
          <p>Services fournis</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
