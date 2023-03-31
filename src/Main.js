import { useRef, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';

export default Main;

const serverAddress = "10.200.140.149:3001";

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
  let countInfo = null;
  let insertBtn = null;
  let [list, setList] = useState(null);
  let columns = null;
  let rows = [];
  let pages = [];

  let [rowsTotalCount, setRowsTotalCount] = useState(0);
  let rowsCount = 0;  
  let pagesTotalCount = 0;
  let currentPageNo = 1;

  const columnNames = {
    company: ["NUMBER", "NAME", "TYPE", "ITEM", "KEY", "DATE", "NOTE"],
    business: ["KEY", "SUBJECT", "VAT"],
    mri: ["NUMBER", "MRI"],
    keyword: ["KEYWORD", "KEY"]
  };
  const rowsMaxCounts = { company: 29, business: 11, mri: 11, keyword: 11 };
  const pageCounts = { company: 20, business: 10, mri: 5, keyword: 5 };

  const uploadRef = useRef();
  const insertRef = useRef();
 
  if (props.tableName !== "company") {
    insertBtn =
      <div>
        <input type="file" accept=".xlsx, .xls" ref={insertRef} onInput={async (e) => {
          e.preventDefault();

          document.body.style.cursor = "wait";

          try {
            const jsonData = await openExcel(e.target.files[0]);
            await axios.post(`http://${serverAddress}/insert?table=${props.tableName}`, jsonData);
            setList(0);
          } catch (err) {
            console.log(err);
          }

          document.body.style.cursor = "default";
        }} />
        <button onClick={() => { insertRef.current.click(); }}>Insert</button>
      </div>
  }
  
  if (list === 0) list = null;
  if (list === null) {
    document.body.style.cursor = "wait";

    axios.get(`http://${serverAddress}/read?table=${props.tableName}
               &offset=${rowsMaxCounts[props.tableName] * (currentPageNo - 1)}
               &count=${rowsMaxCounts[props.tableName]}`)
      .then((response) => {
        if (list !== response.data && response.data.length > 0) {
          setList(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`http://${serverAddress}/count?table=${props.tableName}`)
      .then((response) => {
        setRowsTotalCount(Number(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    document.body.style.cursor = "default";
  }

  columns = columnNames[props.tableName].map((value, index) => {
    return <th key={index}>{value}</th>
  });

  if (list !== null) {
    rowsCount = list.length;

    for (let i = 0; i < rowsCount; i++) {
      let tds = Object.values(list[i]).map((value, index) => { return <td key={index}>{value}</td> });
      rows.push(<tr key={i}>{tds}</tr>);
    }
  }

  let rowsCountDiff = rowsMaxCounts[props.tableName] - rowsCount;
  for (let i = 0; i < rowsCountDiff; i++) {
    let tds = columnNames[props.tableName].map((value, index) => { return <td key={index}></td> });
    rows.push(<tr key={rows.length + i}>{tds}</tr>);
  }

  pagesTotalCount = Math.ceil(rowsTotalCount / rowsMaxCounts[props.tableName]);
  countInfo =
    <div>
      {rowsCount} / {rowsTotalCount}
    </div>
  
  let pageCount = pageCounts[props.tableName];
  let base = Math.floor((currentPageNo - 1)/ pageCount);
  for (let i = base * pageCount + 1; i <= (base + 1) * pageCount; i++) {
    let page = <div key={i} style={{margin:"0px 10px", padding:"3px", border: "1px solid black"}}>{i}</div>
    pages.push(page);
  }

  console.log(pages);

  return (
    <>
      <div className="table-title">{props.tableName.toUpperCase()}</div>
      <div className="table-buttons">
        <div>{countInfo}</div>
        <ul>
          <li>
            <div>
              <input type="file" accept=".xlsx, .xls" ref={uploadRef} onInput={async (e) => {
                e.preventDefault();

                document.body.style.cursor = "wait";

                try {
                  const jsonData = await openExcel(e.target.files[0]); 
                  await axios.delete(`http://${serverAddress}/delete-all?table=${props.tableName}`);
                  await axios.post(`http://${serverAddress}/insert?table=${props.tableName}`, jsonData);
                  setList(0);
                } catch (err) {
                  console.log(err);
                }

                document.body.style.cursor = "default";
              }} />
              <button onClick={() => { uploadRef.current.click(); }}>Upload</button>
            </div>
          </li>
          <li>
            <div>
              <button onClick={() => {
                document.body.style.cursor = "wait";

                axios.get(`http://${serverAddress}/read?table=${props.tableName}&count=-1`)
                  .then((response) => {
                    if (response.data.length > 0) {
                      saveExcel(response.data, props.tableName)
                        .then(() => {
                          console.log("file saved!");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  }).catch((err) => {
                    console.log(err);
                  });

                document.body.style.cursor = "default";
              }}>Download</button>
            </div>
          </li>
          <li>
            {insertBtn}
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
      <div className="paging">
        {pages}
      </div>
    </>
  );
}

async function openExcel(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  return jsonData;
}

async function saveExcel(jsonData, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  await XLSX.writeFile(workbook, fileName + ".xlsx");
}