import { useState, useEffect } from "react"
import React from 'react'
import Axios from "axios"
import { Link } from "react-router-dom"
const Read = () => {
  const [data, setData] = useState([])
  const [inputText, setInput] = useState("")
  const [tabledark, setTableDark] = useState("")
  function getData() {
    Axios.get("https://6420234282bea25f6dfac175.mockapi.io/cruid1").then((resp) => {
      console.log(resp.data)
      setData(resp.data)
    }).catch(() => {
      document.write("404")
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const handleDelete = (id) => {
    Axios.delete(`https://6420234282bea25f6dfac175.mockapi.io/cruid1/${id}`).then(() => {
      getData()
    })
  }
  const setToLocalStorage = (id, title, author,published) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("author", author);
    localStorage.setItem("published", published);
  }
  const inputHandler = (e) => {
    const inputValue = e.target.value || ""; // Set a default value if e.target.value is undefined
    setInput(inputValue.toLowerCase());
  };
  return (

    <div className="container  border border-warning p-5 border-2 mb-5">
      <div className="row">
        <div className="">
          <h5>Dark Mode</h5>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox"
              onClick={() => {
                if (tabledark === "table-dark") setTableDark("")
                else setTableDark("table-dark")
              }}
            />

          </div>
          <div className="row ">
            <div className="col-sm-3">
          <div className='d-flex justify-content-between'>
            <h2>React Operation</h2>
            </div>
            </div>
            <div className="col-sm-3">
            <div classNmae="mb-5">
              <label for="exampleInputEmail1" className="form-label">Search Bar</label>
              <input type="email" className="form-control mb-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="search..." onChange={inputHandler} />

            </div>
            </div>
            <div className="col-sm-2 ms-5">
            <Link to="/">
              <button className='btn btn-primary ms-5'>Back</button>
            </Link>
            </div>

          
          </div>
          <div className="row">
             
          <table className={`table ${tabledark}`}>

            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Title</th>
                <th scope="col">Book Author</th>
                <th scope="col">Year Published & ISBN</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {
              data.filter((el) => {
                if (el && el.title && el.author) {
                  return (
                    el.title.toLowerCase().includes(inputText) ||
                    el.author.toLowerCase().includes(inputText)
                  );
                }
                return false;
              }).map((eachData, id) => {
                return (
                  <tbody key={id}>
                    <tr>
                      <th scope="row">{eachData.id}</th>
                      <td>{eachData.title}</td>
                      <td>{eachData.author}</td>
                      <td>{eachData.published}</td>

                      <td>
                        <Link to="/update"> <button className='btn-success' onClick={() => setToLocalStorage(
                          eachData.id,
                          eachData.title,
                          eachData.author,
                          eachData.published
                        )}>Edit</button></Link>
                      </td>


                      <td><button className='btn-danger' onClick={() => handleDelete(eachData.id)}>Delete</button></td>
                    </tr>

                  </tbody>
                )

              })


            }
          </table>
      
          </div>
        </div>
      </div>
    </div>
  )
}

export default Read
