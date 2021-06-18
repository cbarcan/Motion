import Header from "../Components/Header";
import { EditBoxLeft, EditBoxRight, ProfileEditBox } from "../Components/Profile/EditStyled";
import { BackgroundImg } from "../Components/Profile/styled";
import { InputWrapper, Main } from "../Style/container";
import { useEffect, useState } from "react";
import Input from "../Components/Input";
import styled from "styled-components";
import { useHistory } from "react-router";

const EmailWrapper = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;

        p {
            margin-left: 2%;
            font-size: 12px;
            opacity: 0.2;
        }    
`
    
const ValidationWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    color: black;
       
    .input {
        width: 45%; 
    }

    .hobby {
        width: 80%;
    }

    #hobby {
        ::placeholder{
            opacity: 0.2;
        }
    }

    button {
        height: 40px;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;  
        margin-left: 10%;
        background: inherit;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
        border-radius: 30px;
    
        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }
    }
`

const Hobbies = styled.div`
    height: 76px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const Hobby = styled.p`
    height: 32px;
    width: fit-content;
    background: rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0 10px;
    cursor: default;
    margin: 1% 1%;
    
    button {
        margin-left: 10px;
        border: none;
        background: none;

        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }
    }
    
`


const ProfileEdit = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [userData, setUserData] = useState({});
    const history = useHistory();

    const firstNameChanger = (e) => {
        setUserData({first_name: e.target.value})
    }

    const lastNameChanger = (e) => {
        setUserData({last_name: e.target.value})
    }

    const emailChanger = (e) => {
        setUserData({email: e.target.value})
    }

    const usernameChanger = (e) => {
        setUserData({username: e.target.value})
    }

    const locationChanger = (e) => {
        setUserData({location: e.target.value})
    }

    const aboutMeChanger = (e) => {
        setUserData({about_me: e.target.value})
    }

   
    const avatarHandler = async (e) => {

        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        const config = {
            method: "PATCH",
            headers: new Headers({
                "Authorization": token.toString()
            }),
            body: formData,
        }

        const res = await fetch(url, config);
        const resData = await res.json();
        console.log("res ", resData)
        setUserData({avatar: resData.avatar})
        localStorage.setItem('profilePic', resData.avatar)
    }



    useEffect(() => {
        
        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`

        const config = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
        }
    
        const fetchUsers = async () => {
          const res = await fetch(url, config);
          const resData = await res.json();
          setUserData(resData)
        }

        fetchUsers()
      }, [])

    const open = () => {
        setIsOpen(!isOpen)
    }

    const onSubmitHandler = () => {

        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`
        const email = userData.email;
        const first_name = userData.first_name;
        const last_name = userData.last_name;
        const username = userData.username;
        const location = userData.location;
        const about_me = userData.about_me;

        const config = {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
            body: JSON.stringify({
                email,
                first_name,
                last_name,
                username,
                location,
                about_me,
            })
        }
    
        const fetchUsers = async () => {
          const res = await fetch(url, config);
          const resData = await res.json();
          setUserData(resData)
        }

        fetchUsers()
        history.push('./profile');
    }

    const onDelete = () => {
        const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
        let token = localStorage.token
        token = `Bearer ${token}`

        const config = {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token.toString()
            }),
        }

        const fetchUsers = async () => {
            const res = await fetch(url, config);
            const resData = await res.json();
            console.log(resData)
          }
  
          fetchUsers()
          history.push('./login')
    }

    

    return (
        <>
            <Header />
            <Main>
                <BackgroundImg></BackgroundImg>
                <ProfileEditBox>
                    <EditBoxLeft>
                        <div className='editTopLeft'>
                            <img src={userData.avatar} alt='profile'/>
                            <button onClick={open} className='whiteButton'>UPDATE IMAGE</button>
                            {isOpen && <div className='popup'>
                                <label htmlFor='file-upload' className='fileUpload'>Upload file</label>
                                <input id='file-upload' type='file' className='fileInput' onChange={avatarHandler}/>
                                <button className='whiteButton' >Remove</button>
                            </div>
                           }
                        </div>
                        <div className='editBottomLeft'>
                            <button onClick={onDelete} className='whiteButton'>DELETE ACCOUNT</button>
                            <button onClick={onSubmitHandler} className='saveButton'>SAVE</button>
                        </div>
                    </EditBoxLeft>
                    <EditBoxRight>
                        <ValidationWrapper>
                            <InputWrapper className="input">                        
                                <EmailWrapper>
                                    <p>First name</p> 
                                    <Input name="firstName" type="text" id='firstName' value={userData.first_name} onChange={firstNameChanger}/>
                                </EmailWrapper>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <EmailWrapper>
                                    <p>Last Name</p>
                                    <Input name="lastName" type="text" id='lastName' value={userData.last_name} onChange={lastNameChanger}/>
                                </EmailWrapper>
                            </InputWrapper>
                        </ValidationWrapper>
                        <ValidationWrapper>
                            <InputWrapper className="input">                        
                                <EmailWrapper>
                                    <p>Email</p> 
                                    <Input name="Email" type="text" id='email' value={userData.email} onChange={emailChanger} />
                                </EmailWrapper>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <EmailWrapper>
                                    <p>Username</p>
                                    <Input name="Username" type="text" id='username' value={userData.username} onChange={usernameChanger} />
                                </EmailWrapper>
                            </InputWrapper>
                        </ValidationWrapper>
                        <ValidationWrapper>
                            <InputWrapper className="input">                        
                                <EmailWrapper>
                                    <p>Location</p> 
                                    <Input name="Location" type="text" id='location' value={userData.location} onChange={locationChanger} />
                                </EmailWrapper>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <EmailWrapper>
                                    <p>Phone</p>
                                    <Input name="123-456-7890" type="text" id='phone' readOnly/>
                                </EmailWrapper>
                            </InputWrapper>
                        </ValidationWrapper>
                        <ValidationWrapper>
                            <InputWrapper className="input">                        
                                <EmailWrapper>
                                    <p>About me</p> 
                                    <Input name="About me" type="text" id='aboutMe' value={userData.about_me} onChange={aboutMeChanger} />
                                </EmailWrapper>
                            </InputWrapper>
                            <InputWrapper className="input">
                                <EmailWrapper>
                                    <p>Password</p>
                                    <Input name="Password" type="password" id='password'/>
                                </EmailWrapper>
                            </InputWrapper>                            
                        </ValidationWrapper>
                            <p>Things I like</p>
                        <Hobbies>
                            <Hobby>Guitar <button>X</button></Hobby>
                        </Hobbies>
                        <ValidationWrapper>
                            <InputWrapper className="hobby">
                                <Input name="Type something...." type="text" id='hobby' />                                                         
                            </InputWrapper> 
                            <button>ADD</button>   
                        </ValidationWrapper>
                    </EditBoxRight>
                </ProfileEditBox>
            </Main>
        </>
    )
}

export default ProfileEdit;