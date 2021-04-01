import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app";
import "firebase/database";
import NavbarLogout from "./NavbarLogout"



export default function Dashboard() {
  const [error, setError] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [profileIMG, setProfileIMG] = useState()
  const [owner, setOwner] = useState("")
  const [reviewer, setReviewer] = useState("")
  const [admin, setAdmin] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const user = firebase.auth().currentUser;
  const ref = firebase.database().ref("users/" + user.uid);

  
  ref.once("value")
    .then(function(snapshot) {
      setFname(snapshot.child("Fname").val())
      setLname(snapshot.child("Lname").val())
      setProfileIMG(snapshot.child("profileIMG").val())
      setOwner(snapshot.child("role").child("owner").val())
      setReviewer(snapshot.child("role").child("reviewer").val())
      setAdmin(snapshot.child("role").child("admin").val())
  });

  localStorage.setItem('admin', admin)
  localStorage.setItem('owner', owner)
  localStorage.setItem('reviewer', reviewer)

  console.log(admin)
  // const changeState = () => {  
  //   setstate({owner:owner}),
  //   setstate({reviewer:reviewer}),
  //   setstate({admin:admin})
  //  }; 
  

  async function handleLogout() {
      setError("")
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
  }

  function REVIEWER_UI(){
    return <>
    <br/>
      <Container className="align-items-middle justify-content-center" style={{maxWidth:"600px", "text-align": "middle"}}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">ข้อมูลผู้ใช้</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <img src={profileIMG|| 'https://via.placeholder.com/150'} width="150" height="150" class="rounded mx-auto d-block" alt="Uploaded images"/>
            <p><strong>อีเมล:</strong> {currentUser.email}</p>
            <p><strong>ชื่อจริง:</strong> {fname}</p>
            <p><strong>นามสกุล:</strong> {lname}</p>
            <p><strong>สถานะ:</strong> ผู้รีวิว</p>
            <Link  variant="danger" to="/update-profile" className="btn btn-primary w-100 mt-3">
              แก้ไขโปรไฟล์
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Container>
    </>
  }

  function ADMIN_UI(){
    return <>
    <br/>
      <Container className="align-items-middle justify-content-center" style={{maxWidth:"600px", "text-align": "middle"}}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">ข้อมูลผู้ใช้</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <img src={profileIMG|| 'https://via.placeholder.com/150'} width="150" height="150" class="rounded mx-auto d-block" alt="Uploaded images"/>
            <p><strong>อีเมล:</strong> {currentUser.email}</p>
            <p><strong>สถานะ:</strong> แอดมิน</p>
            <Link  variant="danger" to="/approval" className="btn btn-primary w-100 mt-3">
              ตรวจสอบร้านอาหาร
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Container>
    </>
  }

  function OWNER_UI(){
    return <>
    <br/>
              <Container className="align-items-middle justify-content-center" style={{maxWidth:"600px", "text-align": "middle"}}>
               <Card>
                   <Card.Body>
                     <h2 className="text-center mb-4">ข้อมูลผู้ใช้</h2>
                     {error && <Alert variant="danger">{error}</Alert>}
                     <img src={profileIMG|| 'https://via.placeholder.com/150'} width="150" height="150" class="rounded mx-auto d-block" alt="Uploaded images"/>
                     <p><strong>อีเมล:</strong> {currentUser.email}</p>
                     <p><strong>ชื่อจริง:</strong> {fname}</p>
                     <p><strong>นามสกุล:</strong> {lname}</p>
                     <p><strong>สถานะ:</strong> เจ้าของร้านอาหาร</p>
                     <div class="d-grid me-3 mx-auto gap-2 d-md-flex justify-content-md-center">
                       <Link  variant="danger" style= {{"margin": "25px"}}to="/update-profile-owner" className="btn btn-primary w-35 mt-2">
                         แก้ไขโปรไฟล์
                       </Link>
                       <Link  variant="danger" style= {{"margin": "25px"}} to="/RestaurantList" className="btn btn-primary w-35 mt-2">
                         ดูร้านอาหาร
                       </Link>
                     </div>
                   </Card.Body>
                 </Card>
                 <div className="w-100 text-center mt-2">
                   <Button variant="link" onClick={handleLogout}>
                     Log Out
                   </Button>
                 </div>
              </Container>
           </>
  }
  // return owner? <><NavbarLogout/><OWNER_UI/></> : <><NavbarLogout/><REVIEWER_UI/></>
  if (owner === true) {
    return <><NavbarLogout/><OWNER_UI/></>
  }
  else if (reviewer === true) {
    return <><NavbarLogout/><REVIEWER_UI/></>
  }
  else if (admin === true) {
    return <><NavbarLogout/><ADMIN_UI/></>
  } else {
    return <></>
  }
        // <Container className="align-items-middle justify-content-center" style={{maxWidth:"600px", "text-align": "middle"}}><OWNER_UI/></Container> :          // <Container className="align-items-midlle justify-content-center" style={{maxWidth:"600px",paddingTop: "75px"}}><REVIEWER_UI/></Container>;
}