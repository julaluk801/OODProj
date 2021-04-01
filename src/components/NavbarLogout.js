import React from 'react'
import { useAuth } from "../contexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar,Form, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom"

export default function NavbarLogout() {
    const {logout} = useAuth()
    const history = useHistory()
    async function handleLogout() {
        try {
          await logout()
          history.push("/")
        } catch {
        }
    }
    return (
        <div>
            {/* <Navbar class="navbar navbar-dark bg-dark" style={{"background-color": "#dc3545"}} expand="lg">
                <Navbar.Brand style={{ "color": "#fbf1f8" }} href="/">กินอะไรดี</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link style={{ "color": "#e87883" }} href="/">Home</Nav.Link>
                    <Nav.Link style={{ "color": "#e87883" }} href="/dashboard">Profile</Nav.Link>
                    <Nav.Link style={{ "color": "#e87883" }} href="/">testของเก้า</Nav.Link>
                  </Nav>
                  <Form inline>
                    <Button variant="primary" onClick={handleLogout}>Log out</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>  */}
              <Navbar class="navbar navbar-dark bg-dark" style={{"background-color": "#d00404"}} expand="lg">
                <Navbar.Brand style={{ "color": "#ffffff" }} href="/">กินอะไรดี</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link style={{ "color": "#ffffff" }} href="/">หน้าหลัก</Nav.Link>
                    <Nav.Link style={{ "color": "#ffffff" }} href="/dashboard">Profile</Nav.Link>
                    {/* <Nav.Link href="/">Profile</Nav.Link> */}
                  </Nav>
                  <Form inline>
                    <Button variant="primary" onClick={handleLogout}>ออกจากระบบ</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar> 
        </div>
    )
}
