import Header from "../Components/Header"
import Search from "../Components/Search"
import MainWall from "../Components/MainWall"
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Main } from "../Style/container"


const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Posts = () => {
    const [posts, setPosts] = useState({}); 
    const [firstName, setFirstName] = useState(""); 
    const [avatar, setAvatar] = useState(""); 

    
    const token = `Bearer ${localStorage.getItem("token")}`;

    useEffect (() => {
        const headers = new Headers({
        "Authorization": token, 
        "Content-type": "application/json"
    }) // creating the headers


    const myInit = {
        method: 'GET',
        headers: headers
    } // putting all the information together on the object that we will pass as the second argument to the fetch function.

    fetch('https://motion.propulsion-home.ch/backend/api/social/posts/', myInit)
        .then(response => response.json())
        .then(postsInfo => setPosts(postsInfo))


    // fetch user data
    const url = "https://motion.propulsion-home.ch/backend/api/users/me/";
    const config = {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": token
        }),
    }

    const fetchMe = async () => {
        const res = await fetch(url, config);
        const resData = await res.json();
        setFirstName(resData.first_name);
        setAvatar(resData.avatar);
    }
        fetchMe()
    
    
    }, [])

    return (
        <>
            <Header/>
            <Main>
                <Wrapper>
                    <Search/>
                    <MainWall first_name={firstName} posts={posts.results} avatar={avatar} />
                </Wrapper>
            </Main>
        </>
    )
}

export default Posts;