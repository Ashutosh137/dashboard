import { useEffect, useState } from "react";
import "./App.css";
import EnergyChart from "./components/dashbaord";
import Datagrid from "./components/datagrid";
import { Menu, MenuItem, Select, TextField } from "@mui/material";

function App() {
  const [count, setCount] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    sector: "All",
    source: "All",
    pestle: "All",
    topic: "All",
  });

  const [sectorsList, setSectorsList] = useState([]);
  const [pestleList, setPestleList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [pageperdata, setpageperdata] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://online-1-5nf6.onrender.com/data/dashboard",
        {
          cache: "force-cache",
        }
      );
      const result = await response.json();
      setCount(result.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(count);
    setSectorsList(["All", ...new Set(count.map((item) => item.sector))]);
    setTopicList(["All", ...new Set(count.map((item) => item.topic))]);
    setSourceList(["All", ...new Set(count.map((item) => item.source))]);
    setPestleList(["All", ...new Set(count.map((item) => item.pestle))]);
  }, [count]);

  useEffect(() => {
    let data = count;

    if (filters.sector !== "All") {
      data = data.filter((item) => item.sector === filters.sector);
    }

    if (filters.source !== "All") {
      data = data.filter((item) => item.source === filters.source);
    }

    if (filters.pestle !== "All") {
      data = data.filter((item) => item.pestle === filters.pestle);
    }

    if (filters.topic !== "All") {
      data = data.filter((item) => item.topic === filters.topic);
    }

    setFilteredData(data);
    setpageperdata(data.length);
  }, [filters, count]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Select
        label="sector"
        sx={{ color: "white" }}
        name="sector"
        InputLabelProps={{
          sx: {
            color: "white", // Change label color
          },
        }}
        value={filters.sector}
        onChange={handleFilterChange}
      >
        {sectorsList.map((item, index) => (
          <MenuItem key={index} color="white" value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        label="source"
        name="source"
        InputLabelProps={{
          sx: {
            color: "white", // Change label color
          },
        }}
        sx={{ color: "white" }}
        value={filters.source}
        onChange={handleFilterChange}
      >
        {sourceList.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        label="pestle"
        name="pestle"
        InputLabelProps={{
          sx: {
            color: "white", // Change label color
          },
        }}
        value={filters.pestle}
        sx={{ color: "white" }}
        onChange={handleFilterChange}
      >
        {pestleList.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        name="topic"
        label="topic"
        InputLabelProps={{
          sx: {
            color: "red",
          },
        }}
        value={filters.topic}
        sx={{ color: "white" }}
        onChange={handleFilterChange}
      >
        {topicList.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={pageperdata}
        sx={{ color: "white" }}
        InputLabelProps={{
          sx: {
            color: "white",
          },
        }}
        onChange={(e) => {
          setpageperdata(e.target.value);
        }}
      >
        {Array.from({ length: 5 }, (_, index) =>
          Math.floor((index + 1) * (filteredData.length / 5))
        ).map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>

      <EnergyChart data={filteredData.slice(0, pageperdata)} />
      <Datagrid rows={count.length > 0 && count} />
    </>
  );
}

export default App;
