import styled from "styled-components";
import { decryptUrl } from './utils/encryption';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage';
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

        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const encryptedUrl = queryParams.get('url');
        const decryptedUrl = encryptedUrl ? decryptUrl(encryptedUrl) : '';


        return (
                <Container>
                        <Header />
                        <Routes>
                                <Route path="/:address" element={<MainPage />} />
                        </Routes>
                </Container>
        )
}