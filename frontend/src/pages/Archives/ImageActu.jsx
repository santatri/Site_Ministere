import React from "react";
import { motion } from "framer-motion";

const ImageActu = () => {
  const textAnimation = {
    hidden: { opacity: 0, y: 20 }, // Le texte commence avec opacité 0 et légèrement en bas
    visible: {
      opacity: 1,
      y: 0, // Le texte revient à sa position initiale
      transition: { duration: 1.5, ease: "easeInOut" }, // Animation fluide
    },
  };

  return (
    <div className="image-actu-container">
      <div className="overla">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textAnimation}
        >
          Actualités
        </motion.h1>
      </div>
    </div>
  );
};

export default ImageActu;
