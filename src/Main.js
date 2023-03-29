import { useRef, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';

export default Main;

function Main(props) {
  return (
    <>
      <div className="grid-container">
        <div className="grid-cell cell-a"><Table tableName="company" /></div>
        <div className="grid-cell cell-b"><Table tableName="business" /></div>
        <div className="grid-cell cell-c"><Table tableName="mri" /></div>
        <div className="grid-cell cell-d"><Table tableName="keyword" /></div>
      </div>
    </>
  );
}

function Table(props) {
  let [list, setList] = useState(null);
  let columns = null;
  let rows = null;

  const uploadRef = useRef();
  const downloadRef = useRef();

  if (list === 0) list = null;
  if (list === null) {
    axios.get(`http://10.200.140.149:3001/read?table=${props.tableName}`)
      .then((response) => {
        if (list !== response.data && response.data.length > 0) {
            setList(response.data);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  if (list !== null) {
    columns = Object.keys(list[0]).map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    });

    rows = list.map((object, index) => {
      return <tr key={index}>{Object.values(object).map((value, index) => {
        return <td key={index}>{value}</td>
      })}</tr>
    });
  }

  return (
    <>
      <div className="table-title">{props.tableName.toUpperCase()}</div>
      <div className="table-buttons">      
        <ul>
          <li>
            <div>
              <input type="file" accept=".xlsx, .xls" ref={uploadRef} onInput={(e) => {
                openExcel(e)
                .then((jsonData) => {
                  axios.post(`http://10.200.140.149:3001/insert?table=${props.tableName}`, jsonData)
                    .then((response) => {
                      setList(0);
                    }).catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
              }} />
              <button onClick={() => { uploadRef.current.click(); }}>Upload</button>
            </div>
          </li>
          <li>
            <div>
              <input type="file" accept=".xlsx, .xls" ref={downloadRef} onInput={(e) => openExcel(e)} />
              <button onClick={() => { downloadRef.current.click(); }}>Download</button>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              {columns}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </>
  );
}

async function openExcel(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
  });

  return jsonData;
}
