import React from 'react'
import { useHistory } from "react-router-dom"
import {Container} from "react-bootstrap"
import NavbarLogin from "./NavbarLogin"

export default function SetRole() {
    const history = useHistory()

      const routeOwner = () =>{ 
        let path = `SignUpOwner`; 
        history.push(path);
      }
      const routeReviewer = () =>{ 
        let path = `signupReviewer`; 
        history.push(path);
      }
    return (
          <>
            <NavbarLogin></NavbarLogin>
              <Container>
                  <div className="text-center" style={{ "margin": "50px"}}>
                    <h1>โปรดเลือกรูปแบบสมาชิก </h1>
                    <div>
                      <div style={{ "margin": "50px"}}>
                        <p><img width="100px"src="https://firebasestorage.googleapis.com/v0/b/ood-proj.appspot.com/o/images%2Fentrepreneur.png?alt=media&token=e32fea67-99f4-4a5c-8fd5-55af27079e87" alt="..."/></p>
                        <p><button type="button" style={{ "margin": "15px"}} class="btn btn-primary align-items-center" onClick={routeOwner}>เจ้าของร้านอาหาร</button></p>
                      </div>
                      <div style={{ "margin": "50px"}}>
                        <p><img width="100px"src="https://firebasestorage.googleapis.com/v0/b/ood-proj.appspot.com/o/images%2Freview%20(1).png?alt=media&token=fd8c00d2-4aec-4edb-911e-034530743992" alt="..."/></p>
                        <p><button type="button" style={{ "margin": "15px"}} class="btn btn-primary align-items-center"onClick={routeReviewer}>ผู้รีวิว</button></p>
                      </div>
                    </div> 
                  </div>
              </Container>
            
        </>
    )
}
