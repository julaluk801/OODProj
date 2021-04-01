import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { storage } from "../config/firebase";
import firebase from "firebase/app";
import "firebase/database";
import NavbarLogout from "./NavbarLogout"

export default function UpdateProfileOwner() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail, updateFname, updateLname, updateProfileIMG, updateIDCardIMG } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(false);
    const [profileurl, setProfileURL] = useState("");
    const [idcard, setIDCard] = useState(null);
    const [idcard_url, setidcardURL] = useState("");
    const history = useHistory()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    // const [old_idcard, setOld_idcard] = useState("")
    // const [owner, setOwner] = useState()
    const user = firebase.auth().currentUser;
    // const ref = firebase.database().ref("users/" + user.uid);
    
    // ref.once("value")
    //   .then(function(snapshot) {
    //       setOld_idcard(snapshot.child("profileIMG").val())
    // });
    // console.log(owner)

    const handleProfileImageAsFile = (e) => {
        const image = e.target.files[0]
        setProfile(profile => (image))
    }
    
    async function handleUploadIDCardIMG(e) {
        e.preventDefault();
        const uploadTask = storage.ref(`/images/${idcard.name}`).put(idcard);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("images")
            .child(idcard.name)
            .getDownloadURL()
            .then((url) => {
              setIDCard(null);
              setidcardURL(url);
            });
        });
    }

    const handleIDCardImageAsFile = (e) => {
        const image = e.target.files[0]
        setIDCard(file => (image))
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
        if (fname !== "" && !idcard_url) {
            return setError('หากเปลี่ยนชื่อหรือนามสกุล โปรดอัพโหลดรูปบัตรประชาชน')
        }
        if (lname !== "" && !idcard_url) {
            return setError('หากเปลี่ยนชื่อหรือนามสกุล โปรดอัพโหลดรูปบัตรประชาชน')
        }
        // if (fname === "" && idcard_url) {
        //     return setError('หากอัพโหลดรูปบัตรประชาชน ต้องกรอกชื่อหรือนามสกุล')
        // }
        // if (lname === "" && idcard_url) {
        //     return setError('หากอัพโหลดรูปบัตรประชาชน ต้องกรอกชื่อหรือนามสกุล')
        // }
        if ((fname === "" || lname === "") && idcard_url) {
            return setError('หากอัพโหลดรูปบัตรประชาชน ต้องกรอกชื่อหรือนามสกุล')
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
        if (fname !== "" && idcard_url) {
            promises.push(updateFname(user.uid, fname))
            promises.push(updateIDCardIMG(user.uid, idcard_url))
        }
        if (lname !== "" && idcard_url) {
            promises.push(updateLname(user.uid, lname))
            promises.push(updateIDCardIMG(user.uid, idcard_url))
        }
        if ((fname !== "" && lname !== "") && idcard_url) {
            promises.push(updateLname(user.uid, lname))
            promises.push(updateIDCardIMG(user.uid, idcard_url))
        }
        if (profileurl !== "") {
            promises.push(updateProfileIMG(user.uid, profileurl))
            promises.push(updateIDCardIMG(user.uid, idcard_url))
        }

        Promise.all(promises)
        .then(() => {
            history.push("/dashboard")
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally(() => {
            setLoading(false)
        })
    }    

    // console.log(!idcard && (fname === "" || lname === ""))

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
                <button style={{"margin-bottom": "10px"}} disabled={!profile} onClick={handleUploadProfileIMG} type="button" class="btn btn-outline-success block">อัพโหลด</button> 
                <Form.Group id="fname">
                    <Form.Label>ชื่อจริง</Form.Label>
                    <Form.Control
                        type="input"
                        value={fname}
                        onChange={handleChangeFname}
                        placeholder="ต้องอัพโหลดบัตรประชาชนยืนยัน"
                    />
                </Form.Group>
                <Form.Group id="lname">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                    type="input"
                    value={lname}
                    onChange={handleChangeLname}
                    placeholder="ต้องอัพโหลดบัตรประชาชนยืนยัน"
                />
                </Form.Group>
                <Form.Group id="idcardIMG">
                <Form.Label>รูปบัตรประชาชน</Form.Label>
                <Form.Control type="file" onChange={handleIDCardImageAsFile}/></Form.Group>
                <button style={{"margin-bottom": "10px"}} disabled={!idcard} onClick={handleUploadIDCardIMG} type="button" class="btn btn-outline-success block">อัพโหลด</button>
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
            <Link to="/dashboard">ยกเลิก</Link>
        </div>
        </Container>
    </>
    )
}