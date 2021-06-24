import Header from "../Header"
import MainWall from "../MainWall"
import React, { useEffect, useState } from 'react';
import { Main, FriendsStuff, Wrapper } from "./styled";


const Likes = () => {
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

    fetch('https://motion.propulsion-home.ch/backend/api/social/posts/likes/', myInit)
        .then(response => response.json())
        .then(postsInfo => setPosts(postsInfo))
    
    }, [])

    return (
        <>
            <Header/>
            <FriendsStuff>
            <Main>
                <Wrapper>
                    <MainWall posts={posts.results} />
                </Wrapper>
            </Main>
            </FriendsStuff>
        </>
    )
}

export default Likes;
