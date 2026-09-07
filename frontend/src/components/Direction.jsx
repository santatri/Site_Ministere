import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Direction.css";
import { API_URL } from "../config";
const Direction = () => {
  const [directions, setDirections] = useState([]);
  const [sgList, setSGList] = useState([]);
  const [dgList, setDGList] = useState([]);
  const [msList, setMSList] = useState([]);

  const [nom_d, setNomD] = useState("");
  const [porte_d, setPorteD] = useState("");
  const [id_sg, setIdSG] = useState("");
  const [id_dg, setIdDG] = useState("");
  const [id_ms, setIdMS] = useState("");

  const [type, setType] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la valeur de la recherche
  
  const [view, setView] = useState("list"); // "list" pour afficher la liste, "add" pour afficher le formulaire

  const formRef = useRef(null);

  // Fonction pour récupérer les directions et SG/DG
  const fetchDirections = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/direction/all`);
      const sortedDirections = response.data.data.sort((a, b) => a.porte_d - b.porte_d);
      setDirections(sortedDirections);
    } catch (error) {
      console.error("Erreur lors de la récupération des directions:", error);
    }
  };

  const fetchSGAndDG = async () => {
    try {
      const [sgResponse, dgResponse, msReponse] = await Promise.all([
        axios.get(`${API_URL}/api/direction/sg`),
        axios.get(`${API_URL}/api/direction/dg`),
        axios.get(`${API_URL}/api/direction/ms`),
      ]);
      setSGList(sgResponse.data.data);
      setDGList(dgResponse.data.data);
      setMSList(msReponse.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des SG et DG:", error);
    }
  };

  useEffect(() => {
    fetchDirections();
    fetchSGAndDG();
  }, []);

  // Fonction pour créer une direction
  const createDirection = async () => {
    setMessage("");
    try {
      if (type === "sg") {
        await axios.post(`${API_URL}/api/direction`, {
          nom_d,
          porte_d: formatPorte(porte_d),
          id_sg,
          id_dg: null,
          id_ms: null,
        });
      } else if (type === "dg") {
        await axios.post(`${API_URL}/api/direction`, {
          nom_d,
          porte_d: formatPorte(porte_d),
          id_sg: null,
          id_dg,
          id_ms: null,
        });
      } else if (type === "ms") {
        await axios.post(`${API_URL}/api/direction`, {
          nom_d,
          porte_d: formatPorte(porte_d),
          id_sg: null,
          id_dg: null,
          id_ms,
        });
      }
      setMessage("Direction ajouté avec succès !");

      fetchDirections();
      clearForm();
    } catch (error) {
      setMessage("Ce Direction existe déjà ou erreur lors de l'insertion !");
      console.error("Erreur lors de l'ajout de la direction:", error);
    }
  };

  // Fonction pour mettre à jour une direction
  const updateDirection = async () => {
    try {
      await axios.put(`${API_URL}/api/direction/${editId}`, {
        nom_d,
        porte_d: formatPorte(porte_d),
        id_sg,
        id_dg,
        id_ms,
      });
      setMessage("Direction mise à jour avec succès !");

      fetchDirections();
      clearForm();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la direction:", error);
    }
  };

  // Fonction pour supprimer une direction
  const deleteDirection = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/direction/${id}`);
      setMessage("Direction supprimée avec succès !");

      fetchDirections();
    } catch (error) {
      console.error("Erreur lors de la suppression de la direction:", error);
    }
  };

  // Fonction pour éditer une direction
  const editDirection = (direction) => {
    setEditId(direction.id_d);
    setNomD(direction.nom_d);
    setPorteD(direction.porte_d);
    setIdSG(direction.id_sg);
    setIdDG(direction.id_dg);
    setIdMS(direction.id_ms);

    setType(direction.id_sg ? "sg" : direction.id_dg ? "dg" : "ms");

    // Passer à la vue "add" pour afficher le formulaire d'ajout
    setView("add");

    // Vérifier si formRef.current est défini avant d'essayer de l'utiliser
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fonction pour vider le formulaire
  const clearForm = () => {
    setNomD("");
    setPorteD("");
    setIdSG("");
    setIdDG("");
    setIdMS("");

    setType("");
    setEditId(null);
  };

  // Fonction pour formater la porte
  const formatPorte = (porte) => porte.padStart(3, "0");

  // Fonction pour basculer entre l'affichage du formulaire et de la liste
  const toggleView = (viewType) => {
    setView(viewType);
  };

  // Fonction pour filtrer les directions en fonction du terme de recherche
  const filteredDirections = directions.filter((direction) =>
    direction.nom_d.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="direction-container-new">
      <h1 className="direction-title-new">Gestion des Directions</h1>

      {/* Boutons pour basculer entre afficher la liste ou ajouter une direction */}
      <div className="toggle-buttons">
        <button className="toggle-button" onClick={() => toggleView("add")}>
          Ajouter une direction
        </button>
        <button className="toggle-button" onClick={() => toggleView("list")}>
          Liste des directions
        </button>
      </div>

      {/* Formulaire d'ajout de direction */}
      {view === "add" && (
        <form ref={formRef} className="direction-form-new">
          <input
            type="text"
            value={nom_d}
            onChange={(e) => setNomD(e.target.value)}
            placeholder="Nom de la direction"
            className="direction-input-new"
          />
          <input
            type="text"
            value={porte_d}
            onChange={(e) => setPorteD(e.target.value)}
            placeholder="Porte de la direction"
            className="direction-input-new"
          />

          <div className="direction-radio-group-new">
            <label>
              <input
                type="radio"
                value="sg"
                checked={type === "sg"}
                onChange={() => setType("sg")}
              />
              Premiere Hierarchie
            </label>
            <label>
              <input
                type="radio"
                value="dg"
                checked={type === "dg"}
                onChange={() => setType("dg")}
              />
              Direction Générale
            </label>
            <label>
              <input
                type="radio"
                value="ms"
                checked={type === "ms"}
                onChange={() => setType("ms")}
              />
              Ministre
            </label>
          </div>

          {type === "sg" && (
            <select
              value={id_sg}
              onChange={(e) => setIdSG(e.target.value)}
              className="direction-select-new"
            >
              <option value="">Sélectionner une</option>
              {sgList.map((sg) => (
                <option key={sg.id_sg} value={sg.id_sg}>
                  {sg.nom_sg}
                </option>
              ))}
            </select>
          )}

          {type === "dg" && (
            <select
              value={id_dg}
              onChange={(e) => setIdDG(e.target.value)}
              className="direction-select-new"
            >
              <option value="">Sélectionner une Direction Générale</option>
              {dgList.map((dg) => (
                <option key={dg.id_dg} value={dg.id_dg}>
                  {dg.nom_dg}
                </option>
              ))}
            </select>
          )}

          {type === "ms" && (
            <select
              value={id_ms}
              onChange={(e) => setIdMS(e.target.value)}
              className="direction-select-new"
            >
              <option value="">Sélectionner Ministre</option>
              {msList.map((ms) => (
                <option key={ms.id_ms} value={ms.id_ms}>
                  {ms.nom_ms}
                </option>
              ))}
            </select>
          )}
          {message && (
            <div style={{ padding: "10px", marginBottom: "10px", color: "blue" }}>
              {message}
            </div>
          )}
          <button
            type="button"
            onClick={editId ? updateDirection : createDirection}
            className="direction-btn-primary-new"
          >
            {editId ? "Mettre à jour" : "Ajouter"}
          </button>
          <button type="button" onClick={clearForm} className="direction-btn-secondary-new">
            Annuler
          </button>
        </form>
      )}

      {/* Liste des directions */}
      {view === "list" && (
        <div>
          <h2 className="direction-subtitle-new">Liste des Directions</h2>

          {/* Champ de recherche */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une direction..."
            className="direction-search-input"
          />

          <table className="direction-table-new">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Porte</th>
                <th>Hiérarchie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDirections.map((direction) => (
                <tr key={direction.id_d}>
                  <td>{direction.nom_d}</td>
                  <td>{direction.porte_d}</td>
                  <td>{direction.hierarchy || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => editDirection(direction)}
                      className="direction-btn-edit-new"
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => deleteDirection(direction.id_d)}
                      className="direction-btn-delete-new"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Direction;