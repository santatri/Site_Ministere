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
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setMessage("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="settings-container">
      <h2>Modifier les paramètres</h2>

      <table className="settings-table">
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
                <td data-label="Email">
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    required
                  />
                </td>
                <td data-label="Adresse">
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    required
                  />
                </td>
                <td data-label="Numéro">
                  <input
                    type="text"
                    name="numero"
                    value={settings.numero}
                    onChange={handleChange}
                    required
                  />
                </td>
                <td data-label="Logo">
                  <input type="file" name="logo" onChange={handleFileChange} />
                  {settings.logo && (
                    <img
                      src={`http://localhost:5001/uploads/${settings.logo}`}
                      alt="Logo actuel"
                      width="50"
                    />
                  )}
                </td>
                <td data-label="LogoDG">
                  <input type="file" name="logoDG" onChange={handleFileChange} />
                  {settings.logoDG && (
                    <img
                      src={`http://localhost:5001/uploads/${settings.logoDG}`}
                      alt="LogoDG actuel"
                      width="50"
                    />
                  )}
                </td>
                <td data-label="Action">
                  <button className="settings-button save" onClick={handleSubmit}>
                    💾 Sauvegarder
                  </button>
                  <button
                    className="settings-button cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    ❌ Annuler
                  </button>
                </td>
              </>
            ) : (
              <>
                <td data-label="Email">{settings.email}</td>
                <td data-label="Adresse">{settings.address}</td>
                <td data-label="Numéro">{settings.numero}</td>
                <td data-label="Logo">
                  {settings.logo && (
                    <img
                      src={`http://localhost:5001/uploads/${settings.logo}`}
                      alt="Logo actuel"
                      width="50"
                    />
                  )}
                </td>
                <td data-label="LogoDG">
                  {settings.logoDG && (
                    <img
                      src={`http://localhost:5001/uploads/${settings.logoDG}`}
                      alt="LogoDG actuel"
                      width="50"
                    />
                  )}
                </td>
                <td data-label="Action">
                  <button
                    className="settings-button edit"
                    onClick={() => setIsEditing(true)}
                  >
                     Modifier
                  </button>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>

      {message && (
        <div
          className={`settings-message ${
            message.includes("Erreur") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default SettingsForm;