import { useState } from "react";
import axios from "axios";

export default Main;

function Main(props) {
    return (
        <div>
            <Table tableName="company" />
            <Table tableName="business" />
            <Table tableName="mri" />
            <Table tableName="keyword" />
        </div>
    );
}

function Table(props) {
    let [list, setList] = useState(null);
    let columns, rows;
  
    if (list === null) {
      axios.get(`http://10.200.140.141:3001/read?table=${props.tableName}`)
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
    );
  }