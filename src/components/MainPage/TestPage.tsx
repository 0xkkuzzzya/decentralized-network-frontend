import styled from "styled-components";
import { decryptUrl } from "../utils/encryption";
import { useLocation } from "react-router";


export const TestPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encryptedUrl = queryParams.get('url');
    const decryptedUrl = encryptedUrl ? decryptUrl(encryptedUrl) : '';

    return (
        <>
            <h1>TestPage</h1>
            <h3>url: {decryptedUrl}</h3>
        </>
    )
} 