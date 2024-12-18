import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductsApp from "./components/gerenciarProdutos/ProductsApp";
import Cart from "./components/enviarPedidoDeCompra/Cart";
import Client from "./components/cotarProdutos/Client";
import AdmApp from "./components/gerenciarAdministradores/AdmApp";
import Login from "./components/Login/Login";
import ResetPassword from "./components/Login/ResetPassword";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Produtos" element={<ProductsApp />} />
          <Route path="/Carrinho" element={<Cart />} />
          <Route path="/Cliente" element={<Client />} />
          <Route path="/Administrador" element={<AdmApp />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
