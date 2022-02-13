import styled from "styled-components";

const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
`

const CartItemsContainer = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`
const EmptyMessageContainer = styled.span`
    font-size: 18px;
    margin: 50% auto;
`

export { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer }
