import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/DgformStyle.css"; // Assurez-vous que le fichier CSS est correctement importé

const DForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dName: "",
    post: "",
    description_1: "",
    list_1: "",
    description_2: "",
    list_2: "",
    description_3: "",
    list_3: "",
    image: null,
    logo: null, // Nouveau champ pour le logo
  });

  const [dData, setdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Référence pour le formulaire
  const formRef = useRef(null);

  // Fonction pour récupérer les données
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

  useEffect(() => {
    fetchdData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleEdit = (d) => {
    setFormData({
      id: d.id,
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
      image: null,
      logo: null, // Réinitialiser le logo lors de l'édition
    });
    setIsEditMode(true);

    // Faire défiler la page jusqu'au formulaire
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if ((key === "image" || key === "logo") && formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const url = isEditMode
        ? `http://localhost:5001/api/d/${formData.id}`
        : "http://localhost:5001/api/d";
      const method = isEditMode ? "put" : "post";

      await axios[method](url, data);
      alert(
        isEditMode
          ? "Direction mise à jour avec succès !"
          : "Direction ajoutée avec succès !"
      );
      setFormData({
        firstName: "",
        lastName: "",
        dName: "",
        post: "",
        description_1: "",
        list_1: "",
        description_2: "",
        list_2: "",
        description_3: "",
        list_3: "",
        image: null,
        logo: null, // Réinitialiser le logo après soumission
      });
      fetchdData();
      setIsEditMode(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi des informations :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette Direction ?")) {
      try {
        await axios.delete(`http://localhost:5001/api/d/${id}`);
        fetchdData();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div className="dform-container">
      <h1 className="dform-title">A propos de toutes les Directions</h1>
      <h2 className="dgform-subtitle">
        {isEditMode
          ? "Modifier la Direction"
          : "Formulaire d'insertion à propos de la Direction"}
      </h2>
      <form onSubmit={handleSubmit} className="dform-form" ref={formRef}>
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
          placeholder="Nom de la Direction"
          value={formData.dName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="post"
          placeholder="Poste"
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
        <p>image</p>
        <input placeholder="image" type="file" name="image" onChange={handleFileChange} />
        <p>logo</p>
        <input placeholder="logo" type="file" name="logo" onChange={handleFileChange} /> {/* Nouveau champ pour le logo */}
        <button type="submit" className="dform-submit">
          Enregistrer
        </button>
      </form>

      <h2 className="dgform-section-title">Liste toutes les Directions</h2>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div className="dform-list">
          {dData.map((d) => (
            <div key={d.id} className="dform-item">
              {d.image_url && (
                <img
                  src={`http://localhost:5001${d.image_url}`}
                  alt="Image de la Direction"
                  className="dform-item-image"
                />
              )}
              {d.logo_url && ( // Afficher le logo si disponible
                <img
                  src={`http://localhost:5001${d.logo_url}`}
                  alt="Logo de la Direction"
                  className="dform-item-logo"
                />
              )}
              <div className="dform-item-content">
                <h3>{d.d_name}</h3>
                <p>
                  <strong>Prénom :</strong> {d.first_name}
                </p>
                <p>
                  <strong>Nom :</strong> {d.last_name}
                </p>
                <p>
                  <strong>Poste :</strong> {d.post}
                </p>
                <p>
                  <strong>Description :</strong> {d.description_1}
                </p>
                <ul>
                  {d.list_1.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(d)}
                  className="dform-edit"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="dform-delete"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DForm;