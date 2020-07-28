import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link , useHistory} from 'react-router-dom'
import './styles.css';
import logo from "../../assets/logo.svg";
import api from "../../service/api";


function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    try {
    const result =  await api.post('/ongs', {
      name, 
      email, 
      city,
      whatsapp,
      uf
    })
    window.alert(`Seu ID de acesso: ${result.data.id}`)
    history.push('/');
    } catch(err) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the Hero" />

          <h1> Cadastro </h1>
          <p>Faça seu cadasro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG. </p>
          <Link to="/" className="back-link ">
            <FiArrowLeft size="16" color="#E02041" />
              Tenho cadastro
            </Link>
        </section>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Nome da Ong"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input type="text"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              type="text"
              style={{ width: 80 }}
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register;