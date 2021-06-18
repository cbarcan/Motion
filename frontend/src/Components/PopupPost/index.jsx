import send_button from "../../assets/svgs/send_button.svg";
import gallery from "../../assets/svgs/gallery.svg"; 
import upload from "../../assets/svgs/upload.svg"; 
import styled from 'styled-components';
import Input from '../Input';
import React from 'react'

const BiggerContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
background: #00000096;

` 
const JenPostContainer= styled.div `
    position: relative;
    height: 406px;
    width: 560px;
    color: black;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: white;
    box-shadow: -2px 0px 24px 4px #0000008b;


`
const JenPostTopContainer = styled.div `
    height: 166px;
    margin-top: 40px;
    margin-left: 25px;
    margin-right: 30px;
    display: flex;
    align-items: center;
   
    img{
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }
`

const JenPostMiddleContainer =styled.div `
    height: 144px;
    display: flex;
    align-items: center;
    margin-left: 80px;
    margin-right: 80px;
    color: black;
    overflow: auto;
    resize: none;

`
const JenPostBottomContainer = styled.div `
    height: 106px;
    display: flex;
    align-items: center;
    border-top: 1px solid lightgray;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`

const GalleryUploadBtn = styled.button `
    border: none; 
    background-color: white ;
    margin-left: 20px; 
`


    const SendButton = styled.button `

    background: ${props => props.theme.motionColor};
        opacity: 0.7;
        border-radius: 30px;
        width: 55px;
        height: 55px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 5px;
        margin-left: 70%;

        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }
    
    
    `


const PopupPost = (props) => {

    const realFileInput = React.useRef(null);


    // Button to trigger file selection
    const replaceFileInput = (e) => {
        realFileInput.current.click()
    }

    // File selection event, here you should add files to an array
    const handlePostPic = (e) => {
        console.log(e);
    }

    // create another eventlistener for the send button to dispatch


return (
    <BiggerContainer>
    <JenPostContainer>
        <JenPostTopContainer>
            <img src={localStorage.profilePic} alt='profile'/>  
            <Input name="What’s on your mind, Gian?" type="text" />   
        </JenPostTopContainer>
            <JenPostMiddleContainer>    
            </JenPostMiddleContainer>    
        <JenPostBottomContainer>
            <input type="file" style={{display: "none"}} ref={realFileInput} onChange={e => handlePostPic(e)} accept="image/png, image/jpeg" multiple/>
            <GalleryUploadBtn  onClick={e => replaceFileInput(e)}><img src={gallery} alt='img icon'/></GalleryUploadBtn >
            <GalleryUploadBtn  onClick={e => replaceFileInput(e)}><img src={upload} alt='img icon'/></GalleryUploadBtn >
            <SendButton><img src={send_button} alt='send'/></SendButton> 
        </JenPostBottomContainer>
        {/* </Jenpost> */}
    </JenPostContainer>
    </BiggerContainer>
)}

export default PopupPost; 