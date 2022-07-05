import React, { useState, useEffect } from 'react';
import "../../common/Checkbox.css";
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const EditableRow = ({

    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <tr key={editFormData.id}>
            <td>{editFormData.id}</td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="size..."
                    name="size"
                    value={editFormData.size}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                {editFormData.owner}
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="price..."
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type="submit" id="edit">Save</button>
                <button type="subedit" id="edit" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};
function Table() {
    // mail setup
    // State array variable to save and show data
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        id: "",
        size: "",
        owner: "",
        price: ""
    });


    useEffect(() => {
        async function fetchPostList() {
            try {
                const url = 'https://jfresgister-booth-api.herokuapp.com/booth/all'
                const response = await fetch(url)
                const responseJSON = await response.json()
                setData(responseJSON.result)
            } catch (error) {
                console.log('Failed', error.message)
            }
        }
        fetchPostList()
    }, [])
    /////////////////////////////////////////////////////////////////////////
    


    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };

    const handleEditFormSubmit =  (event) =>  {
        event.preventDefault();
        if (window.confirm(`Ok to Save`)){
        const editedContact = {
            id: editFormData.id,
            size: editFormData.size,
            owner: editFormData.owner,
            price: editFormData.price
        };
        const newContacts = [...data];
        const index = data.findIndex((result) => result.id === editId);
        newContacts[index] = editedContact;
        
            try {
            const res = fetch("https://jfresgister-booth-api.herokuapp.com/booth/change", {
              method: 'PUT',
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify({ 
                "id":  editFormData.id,
                "size": editFormData.size,
                "price": editFormData.price

            })
          });
          } catch (error) {
            console.log("Failed", error.message)
        }
    
        setData(newContacts);
        setEditId(null);
    }
    };

    const handleEditClick = (event, result) => {
        event.preventDefault();
        setEditId(result.id);

        const formValues = {
            id: result.id,
            size: result.size,
            owner: result.owner,
            price: result.price
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditId(null);
    };

    $(document).ready(function () {
        setTimeout(function () {
            $('#sortTable').DataTable();
        }, 2000);
    })

    return (

        <div className="MainDiv">
            <div className="container">
                <form onSubmit={handleEditFormSubmit}>
                    <table id="sortTable" className="dataTable table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Booth Number</th>
                                <th>Size</th>
                                <th>Owner</th>
                                <th>Price</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((result) => {

                                return (
                                    
                                    (editId === result.id) ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) :
                                        (
                                            <tr key={result.id}>
                                                <td>{result.id}</td>
                                                <td>{result.size}</td>
                                                <td>{result.owner}</td>
                                                <td>{result.price}</td>
                                                <td>
                                                    <button type="edit"
                                                        onClick={(event) => handleEditClick(event, result)}

                                                    >Edit</button>
                                                </td>
                                            </tr>
                                        )
                                )

                            })}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}
export default Table;
