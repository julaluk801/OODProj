import React, { useRef, useState } from "react";
import { storage } from "../config/firebase";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function SignupOwner() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { SignupOwner } = useAuth()
    const [error, setError] = useState('')
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setFile(image)
    }

    async function handleUpload(e) {
        e.preventDefault();
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setFile(null);
              setURL(url);
            });
        });
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }  

        try {
            setError('')
            await SignupOwner(emailRef.current.value, passwordRef.current.value, url)
            history.push("/")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
        
    }

    return (
        <>
            <Container className="align-items-center justify-content-center" style={{maxWidth:"420px",paddingTop: "75px"}}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={ handleSubmit }>
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
                <Form.Group id="id-card">
                    <Form.Label>รูปบัตรประชาชน</Form.Label>
                    <Form.Control type="file" onChange={handleImageAsFile} required />
                    <button disabled={!file} onClick={handleUpload} type="button" class="btn btn-outline-success block">อัพโหลด</button> 
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
            </Form>
            <div className="w-100 text-center mt-2">
                หากมีบัญชีอยู่แล้ว กรุณา<Link to="/login">เข้าสู่ระบบ</Link>
            </div>
            </Container>
        </>
    );
}

