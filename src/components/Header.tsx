import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`


export const Header = () => {
    return(
        <HeaderContainer>
            <TonConnectButton/>
        </HeaderContainer>
    )
}