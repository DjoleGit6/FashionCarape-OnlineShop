import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Footer from "../../Footer";
import Header from "../Home/Header";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import "./Profile.css";
import BottomTab from "../../more/BottomTab";

const Profile = ({history }) => {

const { user, loading, isAuthenticated } = useSelector((state) => state.user);

useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

    return (
        <>
       {loading ? (<Loading />):(
        <>
        <Header />
        <div>
            <MetaData title={`${user.name}'s profil`} />
            <div className="profileContainer">
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"column"
                }}>
                    <h1 style={{
                        fontFamily: "Poppins,sans-serif",opacity:"1",
                        fontSize:"2vmax"
                    }}>Moj profil</h1>
                    <img src={user.avatar?.url ? user.avatar.url : ("/user.png")} alt={user.name} className="profile__img" />
                    <Link to="/me/update/info" className="edit__profile">Izmeni profil</Link>
                </div>
            </div>
            <div className="information">
                <div className="middle">
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Username:</h4>
                <p>{user.name}</p>
            </div>
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Email:</h4>
                <p>{user.email}</p>
            </div>
            <div className="info">
            <h4 style={{
                    padding:"0px 5px"
                }}>Pridružio se:</h4>
            <p>{String(user.createdAt).substr(0,10)}</p>
            </div> 
               
              <div className="change__info">
                  <Link to="/orders" className="settings">Moje porudžbine</Link>
                  <Link to="/me/update" className="settings">Promeni lozinku</Link>
              </div>
        </div>  
        </div>
        </div>
        <Footer />
        <BottomTab />
        </>
       )}
       </>
    )
}

export default Profile
