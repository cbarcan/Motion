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
    
    }, [])

    return (
        <>
            <Header/>
            <Main>
                <Wrapper>
                    <Search/>
                    <MainWall posts={posts.results} />
                </Wrapper>
            </Main>
        </>
    )
}

export default Posts;