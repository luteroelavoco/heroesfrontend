import React, { useEffect, useState } from 'react';
import { Link ,useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css';
import logo from "../../assets/logo.svg";
import api from "../../service/api";

function Profile() {

  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history =  useHistory();

  useEffect(() => {
    async function loadProfile() {
      const result = await api.get('profile', {
        headers: {
          Authorization: ongId
        }
      })
      setIncidents(result.data);
    }
    loadProfile();
  }, [ongId])

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){

    }

  } 

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  } 

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be the Hero" />
        <span>Bem vindo, {ongName}</span>
        <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1> Casos Cadastrados </h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso : </strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-Br', {style: 'currency' , currency: 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={()=> handleDeleteIncident(incident.id) }>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile;