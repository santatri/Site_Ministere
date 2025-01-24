import React, { useState, useEffect } from "react";
import axios from "axios";

const DForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dName: "",
    post: "",  // Ajout du champ post
    description_1: "",
    list_1: "",
    description_2: "",
    list_2: "",
    description_3: "",
    list_3: "",
    image: null,
  });

  const [dData, setdData] = useState([]); // Stockage des données récupérées
  const [loading, setLoading] = useState(false); // Gestion du chargement
  const [isEditMode, setIsEditMode] = useState(false); // Nouveau état pour gérer le mode édition

  // Récupérer les données depuis le backend
  const fetchdData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/d");
      setdData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchdData();
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  
  const handleEdit = (d) => {
    setFormData({
      id: d.id, // Charger l'ID du d
      firstName: d.first_name,
      lastName: d.last_name,
      dName: d.d_name,
      post: d.post,
      description_1: d.description_1,
      list_1: d.list_1.join(","),
      description_2: d.description_2 || "",
      list_2: d.list_2.join(","),
      description_3: d.description_3 || "",
      list_3: d.list_3.join(","),
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
        ? `http://localhost:5001/api/d/${formData.id}` // Route PUT pour mise à jour
        : "http://localhost:5001/api/d"; // Route POST pour ajout
      const method = isEditMode ? "put" : "post";

      await axios[method](url, data);
      alert(isEditMode ? "d mis à jour avec succès !" : "Informations envoyées avec succès !");
      setFormData({
        firstName: "",
        lastName: "",
        dName: "",
        post: "",  // Réinitialiser le champ post
        description_1: "",
        list_1: "",
        description_2: "",
        list_2: "",
        description_3: "",
        list_3: "",
        image: null,
      }); // Réinitialiser le formulaire
      fetchdData(); // Rafraîchir les données affichées
    } catch (error) {
      console.error("Erreur lors de l'envoi des informations :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce d ?")) {
      try {
        await axios.delete(`http://localhost:5001/api/d/${id}`);
        fetchdData(); // Rafraîchir les données après la suppression
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div>
      <h1>A propos de dFOP</h1>
      <h2>{isEditMode ? "Modifier le d" : "Formulaire d'insertion A propos de dFOP"}</h2>
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
          name="dName"
          placeholder="Nom de la d"
          value={formData.dName}
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

      <h2>Liste des d</h2>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div>
          {dData.map((d) => (
            <div key={d.id} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {d.image_url && (
                  <img
                    src={`http://localhost:5001${d.image_url}`}
                    alt="Image du d"
                    style={{
                      maxWidth: "150px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
                <div>
                  <h3>{d.d_name}</h3>
                  <p><strong>Prénom :</strong> {d.first_name}</p>
                  <p><strong>Nom :</strong> {d.last_name}</p>
                  <p><strong>Poste :</strong> {d.post}</p>  {/* Affichage du champ post */}
                  <p><strong>Description 1 :</strong> {d.description_1}</p>
                  <p><strong>Liste 1 :</strong></p>
                  <ul>
                    {d.list_1.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {d.description_2 && (
                    <p><strong>Description 2 :</strong> {d.description_2}</p>
                  )}
                  {d.list_2.length > 0 && (
                    <p><strong>Liste 2 :</strong></p>
                  )}
                  <ul>
                    {d.list_2.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {d.description_3 && (
                    <p><strong>Description 3 :</strong> {d.description_3}</p>
                  )}
                  {d.list_3.length > 0 && (
                    <p><strong>Liste 3 :</strong></p>
                  )}
                  <ul>
                    {d.list_3.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
              </div>
              <button onClick={() => handleEdit(d)}>Modifier</button>
              <button onClick={() => handleDelete(d.id)}>Supprimer</button>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default DForm;
