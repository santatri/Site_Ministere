import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Visites.css";

const Visites = () => {
    const [totalVisitors, setTotalVisitors] = useState(0);
      
    
    

    const fetchTotalVisitors = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/visitors');
                setTotalVisitors(response.data.total);
            } catch (err) {
                console.error('Erreur lors de la récupération du total des visiteurs :', err);
            }
    };

    useEffect(() => {
        fetchTotalVisitors();
    }, []);

    return (
        <div>
            <h1 className="visites">Total des visites : {totalVisitors}</h1>
        </div>
    );
};

export default Visites;
