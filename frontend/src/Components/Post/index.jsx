import menu from "../../assets/svgs/menu.svg"
import heart from "../../assets/svgs/heart.svg"
import share from "../../assets/svgs/share.svg"
import styled from 'styled-components';
import moment from 'moment';
import Popup from "reactjs-popup"; 
import avatar from "../../assets/svgs/avatar.svg"; 
import edit from "../../assets/svgs/edit.svg"; 
import garbage from "../../assets/svgs/garbage.svg" ; 


const PostContainer = styled.div `
    background-color: white;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);
    margin-top: 24px; 
    border-radius: 5px;

    p {
        margin-right: 20px;
        margin-left: 30px;
        margin-top: 10px;
        margin-bottom: 15px;
        font-size: 13px;
        line-height: 21px;
        word-wrap: break-word;
    }
`

const Comment = styled.div `
    display: flex;
    padding-top: 15px;
`

const ImgWrapper = styled.div `

    img {
            width: 40px;
            height: 40px;
            margin-right: 20px;
            margin-left: 25px;
        }

`
const NameTime = styled.div `
    
    h5 {
        font-size: 12px;
        flex-direction: column; 
        }

    p {
        font-size: 12px;
        color: rgb(119, 119, 119);
        margin: 0;
        flex-direction: column; 
    }
`

const MenuContainer = styled.div `

    margin-left: auto;
    margin-right: 10px;

    img {
        height: 15px;
    }

    button {
        
    }

`

const FeedPic = styled.div `

    display: grid;
    grid-gap: 1em;

    img {
        width: 100%;
    }      
`

const EditandDelete = styled.div `
    width: 200px;
    height: 80px;
    border-radius: 5px;
    background-color: white;
    box-shadow: -2px 0px 24px 4px rgba(0,0,0,0.12);

        p {
            color:black; 
            font-size: 13px;
            margin: 0;
            flex-direction: column; 

            :hover {
                cursor: pointer;
                background-color: whitesmoke;
            }

        }

        img {
            margin-top: 15px;
            margin-bottom: 0px;
            margin-left: 20px;
            margin-right: 20px; 
            font-size: 12px;
            


            :hover {
                cursor: pointer;
            }

        
        }
`
const LikeShare = styled.div `

        display: flex;
        justify-content: center;
        align-content: center;


        button {
            font-size: 12px; 
            border: none; 
            background-color: transparent;
            margin-right: 10px;
            margin-left: 10px;

            :hover {
            cursor: pointer;
            }

            :active {
            transform: translateY(2px);
            }

            img {
                margin-right: 10px;
            }
        }

        p {
            margin-left: auto;
            margin-right: 10px;
            font-size: 12px;
            color: rgb(119, 119, 119); 
        }
`

const  Post = (props) => {

    if (props.post.user.first_name === props.me) {
        console.log('my post')
    }


    return ( 
    <PostContainer>
        <Comment>
            <ImgWrapper>
                <img src={props.post.user.avatar ? props.post.user.avatar : avatar} alt="avatar"/>
            </ImgWrapper>
            <NameTime>
                <h5>{props.post.user.username}</h5>
                <p>{moment(props.post.created).calendar()}</p>
            </NameTime>
            {(props.post.user.first_name === props.me) &&
                <Popup trigger={() => (<MenuContainer><img src={menu} alt="menu"/></MenuContainer>)} 
                    position={[ "right center", 'bottom right', 'bottom left']}
                    closeOnDocumentClick 
                >
                    <EditandDelete>
                        <p><img src={edit} alt="edit"/>Edit</p>
                        <p><img src={garbage} alt="garbage"/>Delete</p>
                    </EditandDelete>   
                </Popup>
            }
        </Comment>
        <p>{props.post.content}</p>
        {
            props.post.images.length !== 0 &&     
        <FeedPic>
            {props.post.images.map((img,index) => <img key={`${index}-${img}`} src= {img.image} alt="post"/>)}
        </FeedPic>
        }
        <LikeShare>                                    
                <button><img src={ heart } alt= "heart_icon"/>Like</button>
                <button><img src={ share } alt="share_icon"/>Share</button>
                <p>{props.post.amount_of_likes} Likes</p>
        </LikeShare>
    </PostContainer>)
}

export default Post; 

