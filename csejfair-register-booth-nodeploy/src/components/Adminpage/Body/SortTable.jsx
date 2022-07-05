import React, {useState, useEffect} from 'react'
import emailjs from '@emailjs/browser';
//jQuery libraries
 
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

 

function Table() {
  // mail setup
  // State array variable to save and show data
  
  const[filter, setFilter] = useState(false)
  const[data, setData] = useState([])
  useEffect(() => {
    async function fetchPostList() {
      try{
          const url = 'https://jfresgister-booth-api.herokuapp.com/approve/all'
          const response = await fetch (url)
          const responseJSON = await response.json()
          //console.log ({responseJSON})
          setData(responseJSON.result)
          //console.log(responseJSON.result)
        } catch(error){
          console.log('Failed', error.message)
        }
    }
    
    fetchPostList()
  }, [])
  
  function updateData(input) {
    (async () => {
      // PUT request using fetch with async/await
      var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const id = input.id
      const time_approve = time;
      const approved = input.approve
      const admin_id = 1
      // console.log('input : ', input)
      let item = {
        "id": id, 
        "time_approve": time_approve,
        "approve": approved,
        "admin_id": admin_id
      }
      // console.log('item: ', item)
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
      };
      const response = await fetch('https://jfresgister-booth-api.herokuapp.com/approve/update', requestOptions);
      const data = await response.json();
      // console.log('update :', data)
    })();
  }

  function updateBooth(input) {
    (async () => {
      // PUT request using fetch with async/await
      const booth = input.booth_id
      const owner = input.business_id
      // console.log('input : ', input)
      let item = {
        "id": booth, 
        "owner": owner
      }
      // console.log('item: ', item)
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
      };
      const response = await fetch('https://jfresgister-booth-api.herokuapp.com/booth/owner', requestOptions);
      const data = await response.json();
      // console.log('update :', data)
    })();
  } 
  function sendemail(name, email , message) {
    emailjs.send('service_uxib8uh', 'template_8m8l6ao',{
      name: name,
      mail: email,
      message: message
      },'Je5K4iyB2WTu-uFpa').then((result) => {
          // console.log("email: ",result.text);
      }, (error) => {
          console.log("error email: ",error);
      });
  }
  function agreeClick(result) {
    result.approve = 1
    const slot = result.booth_id
    rejectRemain(slot)
    // console.log("resutl: ",result)
    updateData(result)
    sendemail(result.name, result.email, "Register Booth number: "+ result.booth_id+ " successed!")
    alert("Đã gửi 1 email xác nhận đến "+result.email+" !!!")
    updateBooth(result)
    // console.log('agree click : ',data)
    setFilter(!filter)
  }

  function rejectRemain(slot){
    for(var i = 0; i < data.length; i++) {
      if(data[i].booth_id === slot)
      {
        if(data[i].approve !== 1)
        {
          rejectClick(data[i])
        }
      }
    }
  }

  function rejectClick(result) {
    result.approve = 0
    sendemail(result.name, result.email, "Register Booth number: "+ result.booth_id+ " was deny!")
    updateData(result)
    setFilter(!filter)
  }

  $(document).ready(function () {      
    setTimeout(function(){
      $('#sortTable').DataTable();
    } ,1000);
  })  
  return (
    <div className="MainDiv">
      <div className="container">
          <table id="sortTable" className="dataTable table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Booth Slot</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data.map((result) => { 
            return (
                <tr key = {result.id}>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
                    <td>{result.booth_id}</td>
                    <td>{result.time_approve}</td>
                    <td>
                        <p>
                        {result.approve === 1 && <button type="button" className="btn-active btn-note">Accepted</button>}
                        {result.approve === null && <button type="button" className="btn-note">Pending</button>}
                        {result.approve === 0 && <button type="button" className="btn-reject btn-note">Rejected</button>} 
                        </p>
                    </td>
                    <td>
                      {result.approve === null && <button type="button" className="btn-active btn-note" onClick = {() => agreeClick(result)} >Accepted</button>}
                      {result.approve === null && <button type="button" className="btn-reject btn-note" onClick= {() => rejectClick(result)}>Rejected</button>}
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
