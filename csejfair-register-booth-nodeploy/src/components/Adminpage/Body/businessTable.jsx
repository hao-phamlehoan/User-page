import React, { useState, useEffect } from 'react';
// import {Checkbox} from "../../common/Checkbox";
import "../../common/Checkbox.css"

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';


function Table() {
  // mail setup
  // State array variable to save and show data
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchPostList() {
      try {
        const url = 'https://jfresgister-booth-api.herokuapp.com/business/all'
        const response = await fetch(url)
        const responseJSON = await response.json()
        //console.log ({responseJSON})
        setData(responseJSON.result)
        //console.log(responseJSON.result)
      } catch (error) {
        console.log('Failed', error.message)
      }
    }
    fetchPostList()
  }, [])
  async function togglePermit(id) {
    try {
      const res = await fetch("https://jfresgister-booth-api.herokuapp.com/business/toggle/" + id)
      return res
    } catch (error) {
      console.log("Failed", error.message)
    }
    return null;
  }
  async function Delete(id) {
    try {
      const res = await fetch("https://jfresgister-booth-api.herokuapp.com/business/del/" + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
      return res
    } catch (error) {
      console.log("Failed", error.message)
    }
    return null;
  }
  const handleDeleteClick = (Id) => {
    const newContacts = [...data];

    const index = data.findIndex((x) => x.id === Id);

    newContacts.splice(index, 1);

    setData(newContacts);
  };
  
  
  $(document).ready(function () {
    setTimeout(function () {
      $('#sortTable').DataTable();
    }, 2000);
  })
  
  return (

    <div className="MainDiv">
      <div className="container">
        <table id="sortTable" className="dataTable table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permit Register</th>
              <th>Delete Business Account</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result) => {
            
              return ( 
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>
                      <input type="checkbox" className="checkbox1" defaultChecked ={(result.permit === 1)?true:false} onChange={() => togglePermit(result.id)} ></input>
                  </td>
                  <td>
                    <button type="delete"  onClick={() => {
                      if (window.confirm(`Are you sure delete `+ result.email+ ` ?`)){
                        Delete(result.id);
                        handleDeleteClick(result.id)  
                      }
                    }} >Delete</button>
                  </td>
                </tr>

              )
              
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;
