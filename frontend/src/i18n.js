import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          "serviceDetails": {
            "title": "Détails du Service",
            "description": "Description",
            "dossier": "Dossiers préparés",
            "noData": "Aucune donnée disponible",
            "hierarchy": "Hiérarchie",
            "delai": "Délai d'exécution"
          }
        }
        
      },
      mg: {
        translation: {
          serviceDetails: {
            title: "Antsipirian'ny Serivisy",
            description: "Famaritana tsy misy",
            dossier: "Antontan-taratasy Vonona",
            hierarchy: "Firafitra",
            porte: "Varavarana",
            delai: "Faharetana",
            noData: "Tsy misy angona azo",
          },
        },
      },
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de secours
    interpolation: {
      escapeValue: false, // React échappe déjà par défaut
    },
  });

export default i18n;
