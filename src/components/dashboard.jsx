import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const EnergyChart = ({ data }) => {
  const labels = data?.map((item) =>
    new Date(item.published).toLocaleDateString()
  );
  const intensities = data?.map((item) => item.intensity);
  const relevance = data?.map((item) => item.relevance);

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
        label: "relevance",
        data: relevance,
        backgroundColor: "rgba(750, 192, 192, 0.2)",
        borderColor: "rgba(751, 192, 192, 1)",
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
    <div style={{ width: "80vw", height: "1200px", margin: "auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EnergyChart;
