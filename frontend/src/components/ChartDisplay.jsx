import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);


const ChartDisplay = ({ fileUploaded }) => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:3000/getData/${id}`)
          .then((res) => setData(res.data.data))
          .catch((err) => {
            console.log(err);
          });
        console.log(data);
      }, [fileUploaded]);

  //Populate data as bar chart
  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map((row) => row.year),
            datasets: [
              {
                label: "Population (in millions)",
                data: data.map((row) =>row.population),
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                min: 0,
                max: data.length,
              },
              y: {
                beginAtZero: true,
                min: 0,
                max: 10,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <>
      <div className="chart">
        <canvas ref={chartRef} style={{ width: "90vw", height:'80vh' }}></canvas>
      </div>
    </>
  );
};

export default ChartDisplay;
