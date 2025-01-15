import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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

const VisitorCharts = () => {
    const [chartDataWeek, setChartDataWeek] = useState(null);
    const [chartDataMonth, setChartDataMonth] = useState(null);
    const [totalVisitors, setTotalVisitors] = useState(0);

    // Récupérer le total des visiteurs
    const fetchTotalVisitors = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/visitors');
            setTotalVisitors(response.data.total); // Assurez-vous que la clé "total" est dans la réponse
        } catch (err) {
            console.error('Erreur lors de la récupération du total des visiteurs :', err);
        }
    };

    // Récupérer les données des visiteurs par semaine
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
                        label: 'Visiteurs uniques',
                        data: visitors,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            console.error('Erreur lors de la récupération des données pour le graphique des semaines :', err);
        }
    };

    // Récupérer les données des visiteurs par mois
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
                        label: 'Visiteurs uniques',
                        data: visitors,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            console.error('Erreur lors de la récupération des données pour le graphique des mois :', err);
        }
    };

    useEffect(() => {
        fetchTotalVisitors();
        fetchVisitorsByWeek();
        fetchVisitorsByMonth();
    }, []);

    if (!chartDataWeek || !chartDataMonth) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div>
            <h2>Total des visiteurs uniques : {totalVisitors}</h2>

            <h3>Visiteurs uniques par semaine (ce mois)</h3>
            <Bar
                data={chartDataWeek}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Visiteurs par semaine' },
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
            <h2>Visiteurs uniques par mois (cette année)</h2>
            <Bar
                data={chartDataMonth}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Visiteurs par mois' },
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
    );
};

export default VisitorCharts;
