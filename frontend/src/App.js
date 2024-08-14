import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductsApp from './components/gerenciarProdutos/ProductsApp';
import Cart from './components/enviarPedidoDeCompra/Cart';
import Client from './components/cotarProdutos/Client';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Produtos" element={<ProductsApp />} />
                    <Route path="/Carrinho" element={<Cart />} />
                    <Route path="/Cliente" element={<Client />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

