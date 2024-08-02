import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from "axios";

const DataList = ({ fileUploaded }) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getData");
        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
console.log(1234);

    fetchData();
  }, [fileUploaded]); // Fetch data when fileUploaded changes

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {dataList.length > 0 ? (
          dataList.map((dataItem, index) => (
            <li key={dataItem._id}>
              <Link to={`${dataItem._id}`}>{dataItem.title}</Link>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default DataList;
