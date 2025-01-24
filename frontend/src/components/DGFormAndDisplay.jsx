import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Dgform.css';
const DGFormAndDisplay = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dgName: "",
    post: "",  // Ajout du champ post
    description_1: "",
    list_1: "",
    description_2: "",
    list_2: "",
    description_3: "",
    list_3: "",
    image: null,
  });

  const [dgData, setDgData] = useState([]); // Stockage des données récupérées
  const [loading, setLoading] = useState(false); // Gestion du chargement
  const [isEditMode, setIsEditMode] = useState(false); // Nouveau état pour gérer le mode édition

  // Récupérer les données depuis le backend
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

  // Charger les données au montage du composant
  useEffect(() => {
    fetchDGData();
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  
  const handleEdit = (dg) => {
    setFormData({
      id: dg.id, // Charger l'ID du DG
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
      image: null, // Ne pas recharger l'image
    });
    setIsEditMode(true); // Passer en mode édition
  };
  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const url = isEditMode
        ? `http://localhost:5001/api/dg/${formData.id}` // Route PUT pour mise à jour
        : "http://localhost:5001/api/dg"; // Route POST pour ajout
      const method = isEditMode ? "put" : "post";

      await axios[method](url, data);
      alert(isEditMode ? "DG mis à jour avec succès !" : "Informations envoyées avec succès !");
      setFormData({
        firstName: "",
        lastName: "",
        dgName: "",
        post: "",  // Réinitialiser le champ post
        description_1: "",
        list_1: "",
        description_2: "",
        list_2: "",
        description_3: "",
        list_3: "",
        image: null,
      }); // Réinitialiser le formulaire
      fetchDGData(); // Rafraîchir les données affichées
    } catch (error) {
      console.error("Erreur lors de l'envoi des informations :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce DG ?")) {
      try {
        await axios.delete(`http://localhost:5001/api/dg/${id}`);
        fetchDGData(); // Rafraîchir les données après la suppression
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div>
      <h1 className="dfgop">A propos de DGFOP</h1>
      <h2>{isEditMode ? "Modifier le DG" : "Formulaire d'insertion A propos de DGFOP"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dgName"
          placeholder="Nom de la DG"
          value={formData.dgName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="post"
          placeholder="Poste"  // Nouveau champ
          value={formData.post}
          onChange={handleChange}
          required
        />
        <textarea
          name="description_1"
          placeholder="Description 1"
          value={formData.description_1}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="list_1"
          placeholder="Liste 1 (séparée par des virgules)"
          value={formData.list_1}
          onChange={handleChange}
          required
        />
        <textarea
          name="description_2"
          placeholder="Description 2 (optionnel)"
          value={formData.description_2}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="list_2"
          placeholder="Liste 2 (optionnel)"
          value={formData.list_2}
          onChange={handleChange}
        />
        <textarea
          name="description_3"
          placeholder="Description 3 (optionnel)"
          value={formData.description_3}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="list_3"
          placeholder="Liste 3 (optionnel)"
          value={formData.list_3}
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Enregistrer</button>
      </form>

      <h2>Liste des DG</h2>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div>
          {dgData.map((dg) => (
            <div key={dg.id} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {dg.image_url && (
                  <img
                    src={`http://localhost:5001${dg.image_url}`}
                    alt="Image du DG"
                    style={{
                      maxWidth: "150px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
                <div>
                  <h3>{dg.dg_name}</h3>
                  <p><strong>Prénom :</strong> {dg.first_name}</p>
                  <p><strong>Nom :</strong> {dg.last_name}</p>
                  <p><strong>Poste :</strong> {dg.post}</p>  {/* Affichage du champ post */}
                  <p><strong>Description 1 :</strong> {dg.description_1}</p>
                  <p><strong>Liste 1 :</strong></p>
                  <ul>
                    {dg.list_1.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {dg.description_2 && (
                    <p><strong>Description 2 :</strong> {dg.description_2}</p>
                  )}
                  {dg.list_2.length > 0 && (
                    <p><strong>Liste 2 :</strong></p>
                  )}
                  <ul>
                    {dg.list_2.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {dg.description_3 && (
                    <p><strong>Description 3 :</strong> {dg.description_3}</p>
                  )}
                  {dg.list_3.length > 0 && (
                    <p><strong>Liste 3 :</strong></p>
                  )}
                  <ul>
                    {dg.list_3.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
              </div>
              <button onClick={() => handleEdit(dg)}>Modifier</button>
              <button onClick={() => handleDelete(dg.id)}>Supprimer</button>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default DGFormAndDisplay;
