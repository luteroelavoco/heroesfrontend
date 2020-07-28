import React,{ useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import {Link , useHistory} from 'react-router-dom'
import './styles.css';
import logo from "../../assets/logo.svg";
import api from "../../service/api";

function NewIncident() {

  const [title, seTitle] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  async function handleNewIncidente(e){
    e.preventDefault();
    const data = {
      title, 
      description,
      value
    };

    try{
      await api.post('incidents' , data, {
        headers: {
          Authorization: localStorage.getItem('ongId')
        }
      })
      history.push('/profile')
    }catch(err){
      alert(' Erro ao cadastrar caso')
    }
  }
  const history = useHistory();
  return (
    <div className="new-incident ">
      <div className="content">
        <section>
          <img src={logo} alt="Be the Hero" />

          <h1> Cadastro novo caso </h1>
          <p>Descreva o caso detalhadamente para encontrar um heroi que possa resolver isso</p>
          <Link to="/profile" className="back-link">
              <FiArrowLeft size="16" color="#E02041" />  
              Voltar para home
            </Link>
        </section>

        <form onSubmit={handleNewIncidente}>
          <input type="text" 
          value={title}
          onChange={e => seTitle(e.target.value)}
          placeholder="Titulo do caso"/>
          <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholde="Descrição" />
          <input type="text" 
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Valor em reais"/>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;