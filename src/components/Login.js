import React, { useRef, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarLogin from "./NavbarLogin";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            localStorage.setItem('emaillogin', emailRef.current.value);
            history.push("/")
        } catch {
            setError('Failed to Log In')
        }
        setLoading(false)
    }

    return (
        <>
        <NavbarLogin/>
        <br/><br/>
            
            <Container className="align-items-center" style={{ maxWidth:"420px", paddingTop: "20px"}}>
                <div>
                    <h2 className="text-center mb-4">เข้าสู่ระบบ</h2>
                    {/* {JSON.stringify(currentUser)} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>อีเมล</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>รหัสผ่าน</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit" variant="danger">เข้าสู่ระบบ</Button>
                        <div className="w-100 text-center mt-2">
                            <Link to="/forgot-password">ลืมรหัสผ่าน</Link>
                        </div>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        หากไม่มีบัญชี กรุณา<Link to="/SetRole">ลงทะเบียนสมาชิก</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}


