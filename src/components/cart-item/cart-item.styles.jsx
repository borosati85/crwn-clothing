import styled from 'styled-components';

const CartItemContainer = styled.div`
    width: 100%;
    display: flex;
    height: 80px;
    margin-bottom: 15px;
`

const ImgContainer = styled.img`
    width: 30%;
`

const ItemDetails = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 20px;
`

const NameContainer = styled.span`
    font-size: 16px;
`

export { CartItemContainer, ImgContainer, ItemDetails, NameContainer }