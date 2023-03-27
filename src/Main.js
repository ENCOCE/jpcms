import { useRef, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';

export default Main;

function Main(props) {
  return (
    // <div>
    //   <Table tableName="company" />
    //   <Table tableName="business" />
    //   <Table tableName="mri" />
    //   <Table tableName="keyword" />
    // </div>
    <div class="grid-frame">
      <div class="box a">A</div>
      <div class="box b">B</div>
      <div class="box c">C</div>
      <div class="box d">D</div>
    </div>
  );
}

function Table(props) {
  let [list, setList] = useState(null);
  let columns, rows;

  const fileBtn = useRef();

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
      <div>
        {/* <label class="label-button" htmlFor="open-file">
          <div>OPEN</div> 
        </label> */}
        <input id="open-file" type="file" accept=".xlsx, .xls" ref={fileBtn} onInput={(e) => openExcel(e)} 
          onClick={(e) => { console.log(fileBtn); }}/>
        <button onClick={() => {fileBtn.current.click();}}>OPEN</button>
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
  e.preventDefault();

        console.log('reading input file:');

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });
      
        //console.log(e.target.files[0]);
        //console.log(workbook);
        console.log(jsonData);
}