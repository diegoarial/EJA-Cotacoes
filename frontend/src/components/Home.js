import React from 'react';
import styled from 'styled-components';
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    text-align: center;
`;

const Logo = styled.img`
    width: 400px;
    margin-left: -25px;
    margin-bottom: 20px;
`;

const ButtonAdm = styled.button`
    width: 350px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid blue;
    background-color: #fff;
    color: #2c73d2;
    height: 42px;
    margin: 10px;
    font-size: 20px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e6e5e1;
    }
`;

const ButtonCli = styled.button`
    width: 350px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    font-size: 20px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Home = () => {
    return (
        <Container>
            <Logo src={logoImage} alt="Logo" />
            <ButtonAdm onClick={() => window.location.href = '/Produtos'}>Administrador</ButtonAdm>
            <ButtonCli onClick={() => window.location.href = '/Cliente'}>Cotação de Produtos</ButtonCli>
        </Container>
    );
}

export default Home;
