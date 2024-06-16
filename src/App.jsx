import { useEffect, useState } from "react";
import "./App.css";
import EnergyChart from "./components/dashbaord";
import Datagrid from "./components/datagrid";

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
      {/* <Menu id=""  keepMounted open={Boolean()}>
    <MenuItem >ncvxcv</MenuItem>
    </Menu> */}
      <select
        name="sector"
        value={filters.sector}
        onChange={handleFilterChange}
      >
        {sectorsList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="source"
        value={filters.source}
        onChange={handleFilterChange}
      >
        {sourceList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="pestle"
        value={filters.pestle}
        onChange={handleFilterChange}
      >
        {pestleList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select name="topic" value={filters.topic} onChange={handleFilterChange}>
        {topicList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={pageperdata}
        onChange={(e) => {
          setpageperdata(e.target.value);
        }}
      >
        {Array.from({ length: 10 }, (_, index) =>
          Math.floor((index + 1) * (filteredData.length / 10))
        ).map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      <EnergyChart data={filteredData.slice(0, pageperdata)} />
      <Datagrid/>
    </>
  );
}

export default App;
