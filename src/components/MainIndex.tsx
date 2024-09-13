import styled from "styled-components";
import { MainPage } from "./MainPage/MainPage";
import { Header } from "./Header";

const Container = styled.div`
    width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    @media (max-width: 1000px){
        width: 90%;
    }
`


export const MainIndex = () => {
    return(
        <Container>
            <Header/>
            <MainPage/>
        </Container>
    )
}