import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Dform.css';

const DGFormAndDisplay = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dgName: "",
    post: "",
    description_1: "",
    list_1: "",
    description_2: "",
    list_2: "",
    description_3: "",
    list_3: "",
    image: null,
  });

  const [dgData, setDgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchDGData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/dg");
      setDgData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDGData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleEdit = (dg) => {
    setFormData({
      id: dg.id,
      firstName: dg.first_name,
      lastName: dg.last_name,
      dgName: dg.dg_name,
      post: dg.post,
      description_1: dg.description_1,
      list_1: dg.list_1.join(","),
      description_2: dg.description_2 || "",
      list_2: dg.list_2.join(","),
      description_3: dg.description_3 || "",
      list_3: dg.list_3.join(","),
      image: null,
    });
    setIsEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const url = isEditMode
        ? `http://localhost:5001/api/dg/${formData.id}`
        : "http://localhost:5001/api/dg";
      const method = isEditMode ? "put" : "post";

      await axios[method](url, data);
      alert(isEditMode ? "DG mis à jour avec succès !" : "Informations envoyées avec succès !");
      setFormData({
        firstName: "",
        lastName: "",
        dgName: "",
        post: "",
        description_1: "",
        list_1: "",
        description_2: "",
        list_2: "",
        description_3: "",
        list_3: "",
        image: null,
      });
      fetchDGData();
    } catch (error) {
      console.error("Erreur lors de l'envoi des informations :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce DG ?")) {
      try {
        await axios.delete(`http://localhost:5001/api/dg/${id}`);
        fetchDGData();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="dgform-container">
      <h1 className="dgform-title">A propos de DGFOP</h1>
      <h2 className="dgform-subtitle">
        {isEditMode ? "Modifier le DG" : "Formulaire d'insertion A propos de DGFOP"}
      </h2>
      <form onSubmit={handleSubmit} className="dgform-form">
  <div className="left-column">
    <input
      className="dgform-input"
      type="text"
      name="firstName"
      placeholder="Prénom"
      value={formData.firstName}
      onChange={handleChange}
      required
    />
    <input
      className="dgform-input"
      type="text"
      name="lastName"
      placeholder="Nom"
      value={formData.lastName}
      onChange={handleChange}
      required
    />
    <input
      className="dgform-input"
      type="text"
      name="dgName"
      placeholder="Nom de la DG"
      value={formData.dgName}
      onChange={handleChange}
      required
    />
    <input
      className="dgform-input"
      type="text"
      name="post"
      placeholder="Poste"
      value={formData.post}
      onChange={handleChange}
      required
    />
    <textarea
      className="dgform-textarea"
      name="description_1"
      placeholder="Description 1"
      value={formData.description_1}
      onChange={handleChange}
      required
    ></textarea>
    <input
      className="dgform-input"
      type="text"
      name="list_1"
      placeholder="Liste 1 (séparée par des virgules)"
      value={formData.list_1}
      onChange={handleChange}
      required
    />
  </div>

  <div className="right-column">
    <textarea
      className="dgform-textarea"
      name="description_2"
      placeholder="Description 2 (optionnel)"
      value={formData.description_2}
      onChange={handleChange}
    ></textarea>
    <input
      className="dgform-input"
      type="text"
      name="list_2"
      placeholder="Liste 2 (optionnel)"
      value={formData.list_2}
      onChange={handleChange}
    />
    <textarea
      className="dgform-textarea"
      name="description_3"
      placeholder="Description 3 (optionnel)"
      value={formData.description_3}
      onChange={handleChange}
    ></textarea>
    <input
      className="dgform-input"
      type="text"
      name="list_3"
      placeholder="Liste 3 (optionnel)"
      value={formData.list_3}
      onChange={handleChange}
    />
    <input
      type="file"
      name="image"
      onChange={handleFileChange}
    />
    <button className="dgform-button" type="submit">
      {isEditMode ? "Mettre à jour" : "Enregistrer"}
    </button>
  </div>
</form>
      <h2 className="dgform-section-title">Liste des DG</h2>
      {loading ? (
        <p className="dgform-loading">Chargement des données...</p>
      ) : (
        <div className="dgform-list">
          {dgData.map((dg) => (
            <div key={dg.id} className="dgform-item">
              <div className="dgform-item-content">
                {dg.image_url && (
                  <img
                    src={`http://localhost:5001${dg.image_url}`}
                    alt="Image du DG"
                    className="dgform-item-image"
                  />
                )}
                <div>
                  <h3 className="dgform-item-title">{dg.dg_name}</h3>
                  <p><strong>Prénom :</strong> {dg.first_name}</p>
                  <p><strong>Nom :</strong> {dg.last_name}</p>
                  <p><strong>Poste :</strong> {dg.post}</p>
                  <p><strong>Description 1 :</strong> {dg.description_1}</p>
                  <p><strong>Liste 1 :</strong></p>
                  <ul>
                    {dg.list_1.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                className="dgform-button-edit"
                onClick={() => handleEdit(dg)}
              >
                Modifier
              </button>
              <button
                className="dgform-button-delete"
                onClick={() => handleDelete(dg.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DGFormAndDisplay;
