import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Settings.css";

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    email: "",
    address: "",
    logo: "",
    logoDG: "",
    numero: "",
  });
  const [logo, setLogo] = useState(null);
  const [logoDG, setLogoDG] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/set");
        setSettings(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des paramètres :", err);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "logo") {
      setLogo(e.target.files[0]);
    } else if (e.target.name === "logoDG") {
      setLogoDG(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", settings.email);
    formData.append("address", settings.address);
    formData.append("numero", settings.numero);
    if (logo) formData.append("logo", logo);
    if (logoDG) formData.append("logoDG", logoDG);

    try {
      await axios.post("http://localhost:5001/api/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Mise à jour réussie !");
      setIsEditing(false); // Sortir du mode édition après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setMessage("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div>
      <h2>Modifier les paramètres</h2>
      
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Adresse</th>
            <th>Numéro</th>
            <th>Logo</th>
            <th>LogoDG</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  <tr>
    {isEditing ? (
      <>
        <td><input type="email" name="email" value={settings.email} onChange={handleChange} required /></td>
        <td><input type="text" name="address" value={settings.address} onChange={handleChange} required /></td>
        <td><input type="text" name="numero" value={settings.numero} onChange={handleChange} required /></td>
        <td>
          <input type="file" name="logo" onChange={handleFileChange} />
          {settings.logo && <img src={`http://localhost:5001/uploads/${settings.logo}`} alt="Logo actuel" width="50" />}
        </td>
        <td>
          <input type="file" name="logoDG" onChange={handleFileChange} />
          {settings.logoDG && <img src={`http://localhost:5001/uploads/${settings.logoDG}`} alt="LogoDG actuel" width="50" />}
        </td>
        <td>
          <button onClick={handleSubmit}>💾 Sauvegarder</button>
          <button onClick={() => setIsEditing(false)}>❌ Annuler</button>
        </td>
      </>
    ) : (
      <>
        <td data-label="Email">  <br/> {settings.email}</td>
        <td data-label="Adresse"><br/>{settings.address}</td>
        <td data-label="Numéro"><br/>{settings.numero}</td>
        <td data-label="Logo">
          {settings.logo && <img src={`http://localhost:5001/uploads/${settings.logo}`} alt="Logo actuel" width="50" />}
        </td>
        <td data-label="LogoDG">
          {settings.logoDG && <img src={`http://localhost:5001/uploads/${settings.logoDG}`} alt="LogoDG actuel" width="50" />}
        </td>
        <td data-label="Action"><br/>
          <button onClick={() => setIsEditing(true)}>✏️ Modifier</button>
        </td>
      </>
    )}
  </tr>
</tbody>

      </table>

      {message && <div style={{ color: message.includes("Erreur") ? "red" : "green" }}>{message}</div>}
    </div>
  );
};

export default SettingsForm;
