import React, { useRef, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { SignupReviewer } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }
        try {
            setError('')
            setLoading(true)
            await SignupReviewer(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <>
            <Container className="align-items-center justify-content-center" style={{maxWidth:"420px",paddingTop: "75px"}}>
                <div>
                    <h2 className="text-center mb-4">Sign Up</h2>
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
                        <Form.Group id="password-confirm">
                            <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">ลงทะเบียน</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        หากมีบัญชีอยู่แล้ว กรุณา<Link to="/login">เข้าสู่ระบบ</Link>
                    </div>
                </div>
            </Container>
            
        </>
    );
}


