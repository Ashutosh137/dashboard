import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const EnergyChart = ({ data }) => {
  // Extract data for the chart
  const labels = data?.map((item) =>
    new Date(item.published).toLocaleDateString()
  );
  const intensities = data?.map((item) => item.intensity);
  const relevance = data?.map((item) => item.relevance);
  const likelihood = data?.map((item) => item.likelihood);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Intensity",
        data: intensities,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Relevance",
        data: relevance,
        backgroundColor: "rgba(192, 75, 192, 0.2)",
        borderColor: "rgba(192, 75, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "likelihood",
        data: likelihood,
        backgroundColor: "rgba(122, 175, 2)",
        borderColor: "rgba(92,75, 92, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "80vw", margin: "auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EnergyChart;
