import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar,Form, Button } from 'react-bootstrap'

export default function NavbarLogin() {
    return (
        <div>
            <Navbar class="navbar navbar-dark bg-dark" style={{"background-color": "#d00404"}} expand="lg">
                <Navbar.Brand style={{ "color": "#ffffff" }} href="/">กินอะไรดี</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link style={{ "color": "#ffffff" }} href="/">หน้าหลัก</Nav.Link>
                    
                    {/* <Nav.Link href="/">Profile</Nav.Link> */}
                  </Nav>
                  <Form inline>
                    <Button variant="success" href="/login">เข้าสู่ระบบ</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar> 
        </div>
    )
}
