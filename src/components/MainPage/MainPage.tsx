import styled from "styled-components";
import TestUserLogo from '../../assets/TestUserLogo.png'
import { SendTransactionRequest } from "@tonconnect/ui";
import { beginCell } from '@ton/core';
import { createHelia } from "helia";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post, Profile, usePosts, useUser } from "../store/useUsers";


const ITEM = "kQCSJwgXtxWbQaLe3LiCnWiLod2FvSxFcIFqJupWbSVopcFQ"
const API = ""

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


export const MainPage = () => {
    let { address } = useParams()

    let [ user, setUser ] = useUser()
    let [ posts, setPosts ] = usePosts()

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

                let temp_posts: Post[] = []

                for (let index = 0; index < res.result.posts.length; index++) {
                    let post: Post = await (await fetch(res.result.posts[index].link)).json() 
                    temp_posts.push(post)
                }
                setPosts({posts: temp_posts})
            }
        }

        main()

    }, [])

    

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
                    <PostButton>Post</PostButton>
                </UserInfoContrainer>
            </LeftBlock>

            <RightBlock>
                <PostsContainer>
                    {posts.posts.map((post, index) => (
                        <PostBlock key={index}>
                            <PostsTextBlock>
                                <PostDescription>{post.post.content}</PostDescription>
                            </PostsTextBlock>
                        </PostBlock>
                    ))}
                </PostsContainer>
            </RightBlock>
        </Container>
    )
}