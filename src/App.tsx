import { useEffect, useState } from "react";
import "./App.css";
import EnergyChart from "./components/dashboard";

function App() {
  const [count, setCount] = useState([]);
  const [filter, setfilter] = useState("All");
  const [filtereddata, setfiltereddata] = useState(count);

  const [pageperdata, setpageperdata] = useState(100);

  useEffect(() => {
    const data = async () => {
      const datasize = await fetch(
        "https://online-1-5nf6.onrender.com/data/dashboard",
        {
          cache: "force-cache",
        }
      ).then((res) => res.json());
      setCount(datasize.data.data);
    };
    data();
  }, []);
  useEffect(() => {
    setfiltereddata(count);
  }, [count]);

  useEffect(() => {
    console.log(count);
    setfiltereddata(count?.data?.filter((res) => res.sector === filter));
  }, [filter]);

  return (
    <>
      <select
        value={filter}
        onChange={(e) => {
          setfilter(e.target.value);
        }}
      >
        <option value="">all</option>
        <option value="Energy">energy</option>
      </select>
      <select
        value={pageperdata}
        onChange={(e) => {
          setpageperdata(e.target.value);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="100">all</option>
      </select>
      <EnergyChart data={filtereddata?.slice(0, pageperdata)} />;
    </>
  );
}

export default App;
