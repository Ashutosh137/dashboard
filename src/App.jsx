import { useEffect, useState } from "react";
import "./App.css";
import EnergyChart from "./components/dashbaord";

function App() {
  const [count, setCount] = useState([]);
  const [filter, setfilter] = useState("All");
  const [filtereddata, setfiltereddata] = useState(count);

  const [sectorslist, setsectorslist] = useState([]);

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
    console.log(count)
    setsectorslist(Array.from(new Set(count.map((item) => item.sector))))
  }, [count]);

  console.log(sectorslist)

  useEffect(() => {
   
    if (filter === "all") {
      setfiltereddata(count);
      } else {

    setfiltereddata(count?.filter((res) => res.sector === filter));}
  }, [filter]);

  return (
    <>
      <select
        value={filter}
        onChange={(e) => {
          setfilter(e.target.value);
        }}
      >
        {sectorslist?.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
        <option value="all">all</option>
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
      <EnergyChart data={filtereddata?.slice(0, pageperdata)} />
    </>
  );
}

export default App;
