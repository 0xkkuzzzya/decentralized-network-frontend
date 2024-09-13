import styled from "styled-components";
import TestUserLogo from '../../assets/TestUserLogo.png'

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

    const posts = [
        {
            title: "Post 1",
            description: "post 1",
            postImg: TestUserLogo,
        },
        {
            title: "Post 2",
            description: "post 2",
            postImg: TestUserLogo,
        },
        {
            title: "Post 3",
            description: "post 3",
            postImg: TestUserLogo,
        },
    ]

    return (
        <Container>
            <LeftBlock>
                <UserInfoContrainer>
                    <UserNameBlock>
                        <UserLogo src={TestUserLogo} />
                        <UserName>User 1</UserName>
                    </UserNameBlock>
                    <UserInfoBlock>
                        <UserInfo>Age: 20 y.o.</UserInfo>
                        <UserInfo>Followers: 10</UserInfo>
                        <UserInfo>Total posts: 3</UserInfo>
                        <UserInfo>Position: Russia</UserInfo>
                    </UserInfoBlock>
                    <PostButton>Post</PostButton>
                </UserInfoContrainer>
            </LeftBlock>

            <RightBlock>
                <PostsContainer>
                    {posts.map((post, index) => (
                        <PostBlock key={index}>
                            <PostLogo src={post.postImg} />
                            <PostsTextBlock>
                                <PostTitle>{post.title}</PostTitle>
                                <PostDescription>{post.description}</PostDescription>
                            </PostsTextBlock>
                        </PostBlock>
                    ))}
                </PostsContainer>
            </RightBlock>
        </Container>
    )
}