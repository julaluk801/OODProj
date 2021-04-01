import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { storage } from "../config/firebase";
import firebase from "firebase/app";
import "firebase/database";
import NavbarLogout from "./NavbarLogout"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail, updateFname, updateLname, updateProfileIMG } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [profileurl, setProfileURL] = useState("");
    const history = useHistory()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const user = firebase.auth().currentUser;
    // const ref = firebase.database().ref("users/" + user.uid);


    const handleProfileImageAsFile = (e) => {
        const image = e.target.files[0]
        setProfile(profile => (image))
    }    
    
    async function handleUploadProfileIMG(e) {
        e.preventDefault();
        const uploadTask = storage.ref(`/images/${profile.name}`).put(profile);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("images")
            .child(profile.name)
            .getDownloadURL()
            .then((url) => {
              setProfile(null);
              setProfileURL(url);
            });
        });
    }

    const handleChangeFname = event => {
        setFname(event.target.value);
    };

    const handleChangeLname = event => {
        setLname(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        if (fname !== "") {
            promises.push(updateFname(user.uid, fname))
            setError('โปรดอัพโหลดรูปบัตรประชาชน')
        }
        if (lname !== "") {
            promises.push(updateLname(user.uid, lname))
            setError('โปรดอัพโหลดรูปบัตรประชาชน')
        }
        if (profileurl !== "") {
            promises.push(updateProfileIMG(user.uid, profileurl))
        }

        Promise.all(promises)
        .then(() => {
            history.push("/")
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally(() => {
            setLoading(false)
        })
    }
    

    return (
        <>
        <NavbarLogout/>
        <Container className="align-items-middle justify-content-center" style={{maxWidth:"500px", "text-align": "middle"}}>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">แก้ไขข้อมูลผู้ใช้</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <img src={profileurl} width="90" height="90" class="rounded mx-auto d-block" alt="..."/>
                <Form.Group id="profileIMG">
                <Form.Label>รูปประจำตัว</Form.Label>
                <Form.Control type="file" onChange={handleProfileImageAsFile}/></Form.Group>
                <button style={{"margin-bottom": "10px"}} disable={!profile} onClick={handleUploadProfileIMG} type="button" class="btn btn-outline-success block">อัพโหลด</button> 
                <Form.Group id="fname">
                    <Form.Label>ชื่อจริง</Form.Label>
                    <Form.Control
                        type="input"
                        value={fname}
                        onChange={handleChangeFname}
                        placeholder="หากไม่ต้องการเปลี่ยน สามารถเว้นว่างได้"
                    />
                </Form.Group>
                <Form.Group id="lname">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                    type="input"
                    value={lname}
                    onChange={handleChangeLname}
                    placeholder="หากไม่ต้องการเปลี่ยน สามารถเว้นว่างได้"
                />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                    />
                </Form.Group>
                <Form.Group id="password">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="หากไม่ต้องการเปลี่ยน สามารถเว้นว่างได้"
                />
                </Form.Group>
                <Form.Group id="password">
                <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="หากไม่ต้องการเปลี่ยน สามารถเว้นว่างได้"
                />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                บันทึก
                </Button>
            </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">ยกเลิก</Link>
        </div>
        </Container>
    </>
    )
}
