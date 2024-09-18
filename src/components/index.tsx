import styled from "styled-components";
import { decryptUrl } from './utils/encryption';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage';
import { TestPage } from "./MainPage/TestPage";

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
                        <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/test" element={<TestPage />} />
                        </Routes>
                </Container>
        )
}