import styled from "styled-components";
import TestUserLogo from '../../assets/TestUserLogo.png'
import { SendTransactionRequest } from "@tonconnect/ui";
import { Address, beginCell } from '@ton/core';
import { createHelia } from "helia";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullPost, Post, Profile, usePosts, useUser } from "../store/useUsers";
import { useNavigate } from 'react-router-dom';
import { encryptUrl } from '../utils/encryption';
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";


const API = "https://w-api-five.vercel.app"

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const LeftBlock = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid black;
`

const RightBlock = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UserInfoContrainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 50px;
`

const UserNameBlock = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
`

const UserLogo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
`

const UserName = styled.a`
    color: #000;
    font-weight: 500;
    font-size: 20px;
    margin-left: 10px;
`

const UserInfoBlock = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`

const UserInfo = styled.a`
    color: #000;
    font-weight: 500;
    font-size: 15px;
`

const PostButton = styled.button`
    width: 80%;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
`

const PostsContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px 0px;
    gap: 10px;
`

const PostBlock = styled.div`
    width: 100%;
    height: 40px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    padding: 10px;
`

const PostTitle = styled.a`
    color: #000;
    font-weight: 500;
    font-size: 18px;
`

const PostLogo = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 100%;
`

const PostsTextBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 10px;
`

const PostDescription = styled.a`
    color: #000;
    font-weight: 500;
    font-size: 14px;
    margin-top: 10px;
`

const InputPost = styled.textarea`
    width: 80%;
    height: 100px;
    font-size: 15px;
`


export const MainPage: React.FC = () => {
    let { address } = useParams()
    const[value, setValue] = useState(""); 

    let [user, setUser] = useUser()
    let [posts, setPosts] = usePosts()
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress();

    useEffect(() => {
        async function main() {

            type TPost = { address: string, link: string }

            interface Response {
                ok: string,
                result: {
                    user_profile_link: string,
                    posts: TPost[]
                }
                err: string
            }

            let res: Response = await (await fetch(`${API}/api/v1/profile/info?address=${address}`)).json()
            if (res.ok == "true") {
                let profile: Profile = await (await fetch(res.result.user_profile_link)).json()
                setUser(profile)

                let temp_posts: FullPost[] = []

                for (let index = 0; index < res.result.posts.length; index++) {
                    try {
                        let post: Post = JSON.parse((((res.result.posts[index].link).replace(/\\/g, "")).toString()).slice(1))
                        temp_posts.push({
                            address: res.result.posts[index].address,
                            post: {
                                content: post.post.content,
                                timestamp: post.post.timestamp
                            }
                        })
                    } catch (e) {
                        console.error(e)
                    }
                }

                setPosts({ posts: temp_posts })
            }
        }

        main()

    }, [])

    const GetCreatePost = async (link: string) => {
        interface Response {
            ok: string,
            result: {
                payload: string,
                address: string
            }
            err: string
        }
        
        let result: Response = await (await fetch(API + `/api/v1/msg/create_post?link=${encodeURIComponent(link)}&address=${userFriendlyAddress}`)).json()

        if (result.ok == "true") {
            return { body: result.result.payload, address: result.result.address }
        }
        return { body: "", address: "" }
    }

    const GetCreatePostNotOwner = async (link: string) => {
        interface Response {
            ok: string,
            result: {
                payload: string,
                jw: string
            }
            err: string
        }
        
        let result: Response = await (await fetch(API + `/api/v1/msg/create_post_not_owner?link=${encodeURIComponent(link)}&address=${userFriendlyAddress}`)).json()

        if (result.ok == "true") {
            return { body: result.result.payload, address: result.result.jw }
        }
        return { body: "", address: "" }
    }

    const CreatePost = (res: { body: string, address: string }) => {
        let parsed_amount = (0.15 * 10 ** 9)
        const myTransaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: res.address,
                    amount: parsed_amount.toString(),
                    payload: res.body
                }
            ]
        }
        return myTransaction
    }

    const CreatePostAction = async (text: string) => {
        let link = {
            post: {
                content: text,
                timestamp: new Date().toDateString()
            }
        }
        console.log(link)

        let res = {
            body: "",
            address: ""
        }

        if (address == userFriendlyAddress) {
            res = await GetCreatePost(JSON.stringify(link))
        } else {
            res = await GetCreatePostNotOwner(JSON.stringify(link))
        }

        let tx = CreatePost(res)
        tonConnectUI.sendTransaction(tx);
    }

    return (
        <Container>
            <LeftBlock>
                <UserInfoContrainer>
                    <UserNameBlock>
                        <UserLogo src={user.profile.avatar} />
                        <UserName>{user.profile.username}</UserName>
                    </UserNameBlock>
                    <UserInfoBlock>
                        <UserInfo>{user.profile.bio}</UserInfo>
                    </UserInfoBlock>
                    <InputPost onChange={(e) => {setValue(e.target.value)}} />
                    <PostButton onClick={() => {
                        if (value != "") {
                            CreatePostAction(value)
                        }
                    }}>Post</PostButton>
                </UserInfoContrainer>
            </LeftBlock>

            <RightBlock>
                <PostsContainer>
                    {posts.posts.map((post, index) => (
                        <PostBlock key={index}>
                            <PostsTextBlock>
                                <PostDescription>{ 
                                    //userFriendlyAddress === undefined ? post.address :
                                    //post.address == Address.parse(userFriendlyAddress).toString() ? "Owner" : post.address
                                    post.address
                                }</PostDescription>
                                <PostDescription>{post.post.content}</PostDescription>
                            </PostsTextBlock>
                        </PostBlock>
                    ))}
                </PostsContainer>
            </RightBlock>
        </Container>
    )
}