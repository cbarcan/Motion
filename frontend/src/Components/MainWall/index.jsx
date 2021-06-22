import Input from '../Input';
import Masonry from 'react-masonry-css';
import "../MainWall/style.css" ;
import send_button from "../../assets/svgs/send_button.svg";
import styled from 'styled-components';
import Post from "../Post"; 
import Popup from 'reactjs-popup';
import PopupPost from "../PopupPost"

const Wall = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;  
    
`
const LeftWall = styled.div `
    height: 100%;
    width: 80%;
   /*  margin-right: 15px; */
`
const Jenpost = styled.div `
    background-color: white;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin-top: 30px;

    .profile{
        height: 60px;
        width: 60px;
        border-radius: 30px;
    }

    input {
        width: 265px;
        color:rgb(119, 119, 119);
        height: 60px;
    }

    img {
        width: 50px; 
        margin-right: 30px;
        margin-left: 25px;
    }

    button {
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

        :hover {
            cursor: pointer;
        }

        :active {
            transform: translateY(2px);
        }

    }
`

const MainWall = (props) => {
return (
            <Wall>
                <LeftWall>                        
                    <Masonry
                        breakpointCols={2}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"> 
                
                        <Jenpost>
                            <img className='profile' src={localStorage.profilePic} alt='profile'/>
                            <Input name={`What’s on your mind, ${props.first_name}?`} type="text" />
                            <Popup
                            trigger={<button><img src={send_button} alt='send'/></button>}
                            modal
                            nested 
                            >
                                {
                                    close=>(
                                        <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>

                                        </div>
                                    )
                                }
                                <span> 
                                        <PopupPost avatar={props.avatar} first_name={props.first_name}></PopupPost>
                                </span>
                            </Popup>
                        </Jenpost>
                        {props.posts && props.posts.map((post)=> <Post key={post.id} post={post}/>)}
                        </Masonry>       
                </LeftWall>
            </Wall>           
        )          
}
export default MainWall; 