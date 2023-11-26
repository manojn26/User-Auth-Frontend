import { Button, Container } from "react-bootstrap"
import "../styles/Home.css";
import axios from "axios"
import API_URL from "../../config/global"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [userResponse, setUserResponse] = useState({})
    const navigate = useNavigate()
    const getData = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: token
                }
            }
            const response = await axios.get(`${API_URL}/home`, config);
            console.log(response);
            if (response.data === "Invalid Token") {
                alert("Un Authorized User")
            } else if (response.data === "Server Busy") {
                alert("Server Busy")
            } else if (response?.status) {
                setUserResponse(response?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))
        console.log("User Info Local", user?.token);
        if (user?.token) {
            getData(user?.token)
        }
    }, [])

    function logoutHandler() {
        navigate("/login")
        localStorage.removeItem("userInfo")

    }


    return (
        <>
            {!userResponse ? <Container>
                <h1>Welcome to Our Page</h1>
                <p>We are here to serve you</p>
                <p>Name : {userResponse?.name}</p>
                <p>Email : {userResponse?.email}</p>
                <Button variant="primary" type="submit">Get Started</Button>
                <br />
                <br />
                <Button variant="danger" onClick={logoutHandler} type="submit">Logout</Button>

            </Container> : <h1>Un Authorized User</h1>}
        </>
    )
}

export default Home