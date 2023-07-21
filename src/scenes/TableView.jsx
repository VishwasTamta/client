import React, { useEffect, useState } from "react";

const TableView = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:8080/getMongoData");
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setTableData(data?.users);
      }
    };
    getData();
  }, []);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <table className="border">
        <thead>
          <tr className="border">
            {tableData?.length > 0 &&
              Object.keys(tableData[0]).map((head, index) => {
                return (
                  <th key={index} className="p-2">
                    {head}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row) => {
            return (
              <tr key={row._id} className="border">
                <td className="border p-2">{row._id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
