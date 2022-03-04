import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from "mdb-react-ui-kit";
import { CSVLink } from "react-csv";

function Dashboard() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const[isDeleted,setIsDeleted]=useState(false);
  
 

  const sortOptions = ["name", "address", "email", "phone", "status"];
  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, [isDeleted,basicModal]);
  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:5000/users?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
            setValue("");
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "filter":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:5000/users?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };
  console.log("data", data);
  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUsersData(0, 4, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 4, 0, "search");
  };
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUsersData(0, 4, 0, "sort", value);
  
  };
  const handleFilter = async (value) => {
    loadUsersData(0, 4, 0, "filter", value);
  };
  const toggleShow = () => setBasicModal(!basicModal);
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Status", key: "status" },
  ];
  
  const csvReport={
      filename:'Report.csv',
      headers:headers,
       data:data
  }
  const handleModalSubmit=(e)=>{
   e.preventDefault();
   const user = {
    name: name,
    email: email,
    phone:phone,
    address:address,
    status:status,
    
  };
  console.log("user", user);
  axios.post("http://localhost:5000/users", user).then((res) => {
    setBasicModal(false);
    alert("item added");
  })
  .catch((e)=>console.log(e))
  }
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:5000/users/${id}`).then((res) => {
      setBasicModal(false);
      setIsDeleted(true);
      alert("item deleted");
    })
    .catch((e)=>console.log(e));
  }
  const renderPagination = () => {
    if (data.length < 4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => loadUsersData(4, 8, 1, operation, sortFilterValue)}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 4,
                  (currentPage + 2) * 4,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return (
    <MDBContainer>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <MDBBtn type="submit" color="dark">
          Search
        </MDBBtn>
        <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
          Reset
        </MDBBtn>
      </form>
      <div style={{ marginTop: "100px" }}>
        <h2 className="text-center">
          List of Items
        </h2>
        <span className="my-2"><CSVLink {...csvReport}>Export csv link</CSVLink></span>
        <MDBBtn className="my-2 mx-2" onClick={toggleShow}>Add item</MDBBtn>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.status}</td>
                      <td><MDBBtn color="danger" onClick={()=>handleDelete(item.id)}>Delete</MDBBtn></td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "250px",
            alignContent: "center",
          }}
        >
          {renderPagination()}
        </div>
      </div>
      {data.length > 0 && (
        <MDBRow>
          <MDBCol size="8">
            <h5>Sort By</h5>
            <select
              style={{ width: "50%", borderRadius: "2px", height: "35px" }}
              onChange={handleSort}
              value={sortValue}
            >
              <option>Please select value</option>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol size="4">
            <h5>Filter by status:</h5>
            <MDBBtnGroup>
              <MDBBtn color="success" onClick={() => handleFilter("Active")}>
                Active
              </MDBBtn>
              <MDBBtn
                color="danger"
                style={{ marginLeft: "2px" }}
                onClick={() => handleFilter("Inactive")}
              >
                InActive
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>
      )}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={handleModalSubmit}>
              <div>
              <input className="form-control my-2" type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
              </div>
              <div>
              <input className="form-control my-2" type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              
              <div>
              <input className="form-control my-2" type="text" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)}/>
              </div>
              <div>
              <input className="form-control my-2" type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
              </div>
              <div>
              <input className="form-control my-2" type="text" placeholder="status" onChange={(e)=>setStatus(e.target.value)}/>
              </div>
             
            </form>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn onClick={handleModalSubmit}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default Dashboard;
