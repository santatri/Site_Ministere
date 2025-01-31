import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../styles/VisitorCharts.css'; // Importer le fichier CSS
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const recordVisit = async () => {
    try {
        const response = await axios.post('http://localhost:5001/api/visit');
        console.log('Réponse de l\'API:', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la visite :', error);
    }
};

const VisitorCharts = () => {
    const [chartDataWeek, setChartDataWeek] = useState(null);
    const [chartDataMonth, setChartDataMonth] = useState(null);
    const [chartDataYear, setChartDataYear] = useState(null);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [uniqueVisitorsToday, setUniqueVisitorsToday] = useState(0); // Nouvel état pour les visiteurs uniques
    const [Visitors, setVisitors] = useState(0); // Nouvel état pour les visiteurs uniques
    

    const fetchTotalVisitors = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/visitors');
            setTotalVisitors(response.data.total);
        } catch (err) {
            console.error('Erreur lors de la récupération du total des visiteurs :', err);
        }
    };

    const fetchUniqueVisitorsToday = async () => {
        try {
            console.log("Récupération des visiteurs uniques...");
            const response = await axios.get('http://localhost:5001/api/unique-visitors');
            console.log('Réponse de l\'API (visiteurs uniques) :', response.data);
            setUniqueVisitorsToday(response.data.unique_visitors);
        } catch (err) {
            console.error('Erreur lors de la récupération des visiteurs uniques :', err);
        }
    };

    const fetchUniqueVisitors = async () => {
        try {
            console.log("Récupération des visiteurs ...");
            const response = await axios.get('http://localhost:5001/api/total-daily-visitors');
            console.log('Réponse de l\'API (visiteurs ) :', response.data);
            setVisitors(response.data.total_unique_visitors);
        } catch (err) {
            console.error('Erreur lors de la récupération des visiteurs uniques :', err);
        }
    };

    const fetchVisitorsByWeek = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/visitors-by-week');
            const data = response.data;
            const weeks = data.map(item => `Semaine ${item.week_number}`);
            const visitors = data.map(item => item.total);
            setChartDataWeek({
                labels: weeks,
                datasets: [
                    {
                        label: 'Visites',
                        data: visitors,
                        backgroundColor: 'rgba(75, 190, 992, 0.7)',
                        borderColor: 'rgba(05, 192, 942, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            console.error('Erreur lors de la récupération des données pour le graphique des semaines :', err);
        }
    };

    const fetchVisitorsByMonth = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/visitors-by-month');
            const data = response.data;
            const months = data.map(item => `Mois ${item.month_number}`);
            const visitors = data.map(item => item.total);
            setChartDataMonth({
                labels: months,
                datasets: [
                    {
                        label: 'Visites',
                        data: visitors,
                        backgroundColor: 'rgba(153, 12, 255, 0.7)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            console.error('Erreur lors de la récupération des données pour le graphique des mois :', err);
        }
    };

    const fetchVisitorsByYear = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/visitors-by-year');
            const data = response.data;
            const years = data.map(item => `Année ${item.year_number}`);
            const visitors = data.map(item => item.total);
            setChartDataYear({
                labels: years,
                datasets: [
                    {
                        label: 'Visites',
                        data: visitors,
                        backgroundColor: 'rgba(25,10, 914, 0.7)',
                        borderColor: 'rgba(25, 19, 640, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            console.error('Erreur lors de la récupération des données pour le graphique des années :', err);
        }
    };

    useEffect(() => {
        recordVisit();
        fetchTotalVisitors();
        fetchUniqueVisitorsToday(); // Appel de la nouvelle fonction
        fetchUniqueVisitors(); // Appel de la nouvelle fonction

        fetchVisitorsByWeek();
        fetchVisitorsByMonth();
        fetchVisitorsByYear();
    }, []);

    if (!chartDataWeek || !chartDataMonth || !chartDataYear) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div>
            <h2 className="chart-title">Total des visites : {totalVisitors}</h2>
            <h2 className="chart-title">Visiteurs uniques aujourd'hui : {uniqueVisitorsToday}</h2>
            <h2 className="chart-title">Total des Visiteurs : {Visitors}</h2>


            <div className="chart-row">
                {/* Premier graphique : Visiteurs par semaine */}
                <div className="chart-container">
                    <h3 className="chart-title1">Visites par semaine (ce mois)</h3>
                    <Bar
                        data={chartDataWeek}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Visites par semaine' },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    color: 'black',
                                    font: { weight: 'bold', size: 12 },
                                    formatter: (value) => `${value}`,
                                },
                            },
                        }}
                    />
                </div>

                {/* Deuxième graphique : Visiteurs par mois */}
                <div className="chart-container">
                    <h2 className="chart-title2">Visites par mois (cette année)</h2>
                    <Bar
                        data={chartDataMonth}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Visites par mois' },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    color: 'black',
                                    font: { weight: 'bold', size: 12 },
                                    formatter: (value) => `${value}`,
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Dernier graphique : Visiteurs par année */}
            <div className="chart-container">
                <h3 className="chart-title3">Visites par année</h3>
                <Bar
                    data={chartDataYear}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Visites par année' },
                            datalabels: {
                                anchor: 'end',
                                align: 'top',
                                color: 'black',
                                font: { weight: 'bold', size: 12 },
                                formatter: (value) => `${value}`,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};
export default VisitorCharts;