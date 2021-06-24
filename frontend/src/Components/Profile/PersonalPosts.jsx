import React, { useEffect, useState } from 'react';
import { Main, FriendsStuff, Wrapper } from "./styled";
import ProfileWall from ".";
import Masonry from 'react-masonry-css';
import Post from "../Post";


const PersonalPosts = () => {
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
            <FriendsStuff>
            <Main>
                <Wrapper>
                <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {posts && posts.results.map((post) => <Post key={post.id} post={post}/>)}
                </Masonry>
                </Wrapper>
            </Main>
            </FriendsStuff>
        </>
    )
}

export default PersonalPosts;

