// src/pdf/donnepdf.js

import { pdf, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import MTEFOP from "../assets/MTEFOP.png";

// 🎨 Styles PDF simplifiés et épurés
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.5,
  },

  // Header avec logo
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "1px solid #E8EAED",
  },

  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },

  headerText: {
    flexDirection: "column",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A365D",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 11,
    color: "#718096",
    fontWeight: "normal",
  },

  // Sections principales
  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1px solid #EDF2F7",
  },

  sectionContent: {
    fontSize: 12,
    color: "#4A5568",
    paddingLeft: 2,
  },

  // Liste des documents
  listContainer: {
    marginTop: 6,
  },

  listItem: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },

  bullet: {
    fontSize: 16,
    color: "#4299E1",
    marginRight: 8,
    marginTop: -1,
  },

  itemText: {
    fontSize: 12,
    color: "#4A5568",
    flex: 1,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: "#A0AEC0",
    paddingTop: 15,
    borderTop: "1px solid #F7FAFC",
  },

  // Conteneur d'information simple
  infoBox: {
    backgroundColor: "#F7FAFC",
    padding: 12,
    borderRadius: 4,
    marginTop: 5,
    borderLeft: "3px solid #4299E1",
  },
});

// 📄 Génération du PDF
export const generatePDF = async (service) => {
  const dossierList = service.dossier_prepare
    ? service.dossier_prepare.split(",")
    : [];

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER avec logo */}
        <View style={styles.header}>
          <Image src={MTEFOP} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{service.nom_service || "Service"}</Text>
            <Text style={styles.subtitle}>
              Fiche d'information • {new Date().toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>

        {/* Hiérarchie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hiérarchie</Text>
          <View style={styles.infoBox}>
            <Text style={styles.sectionContent}>
              {service.hierarchy || "Non définie"}
            </Text>
          </View>
        </View>

        {/* Porte hiérarchique */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Porte hiérarchique</Text>
          <View style={styles.infoBox}>
            <Text style={styles.sectionContent}>
              {service.porte_hierarchique || "Non définie"}
            </Text>
          </View>
        </View>

        {/* Délai */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Délai de traitement</Text>
          <View style={styles.infoBox}>
            <Text style={styles.sectionContent}>
              {service.delai || "Sans délai spécifié"}
            </Text>
          </View>
        </View>

        {/* Documents à fournir */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents requis</Text>
          <View style={styles.listContainer}>
            {dossierList.length > 0 ? (
              dossierList.map((doc, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemText}>{doc.trim()}</Text>
                </View>
              ))
            ) : (
              <View style={styles.infoBox}>
                <Text style={styles.sectionContent}>
                  Aucun document spécifié
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Informations supplémentaires */}
        {(service.remarque || service.commentaire) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations complémentaires</Text>
            <View style={styles.infoBox}>
              <Text style={styles.sectionContent}>
                {service.remarque || service.commentaire || ""}
              </Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Document généré automatiquement • MTEFOP • {new Date().toLocaleDateString('fr-FR')}
        </Text>

      </Page>
    </Document>
  );

  // Téléchargement
  const blob = await pdf(doc).toBlob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${service.nom_service || 'service'}_fiche.pdf`;
  link.click();
};