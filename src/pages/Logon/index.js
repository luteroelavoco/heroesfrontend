import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'
import './styles.css';
import heroesimg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import api from "../../service/api";

function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogin(e){
    e.preventDefault();
    try{
      const response = await api.post('sessions',{ id });

      const { name } = response.data;
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName' , name);
      history.push('/profile');

    }catch(err){
      alert('Aconteu um erro');
    }

  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            type="text"
            placeholder="Sua ID" 
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit"> Entrar </button>
          <Link to="/register" className="back-link ">
            <FiLogIn size="16" color="#E02041" />
              Não tenho cadastro
            </Link>
        </form>
      </section>

      <img src={heroesimg} />
    </div>
  )
}

export default Logon;