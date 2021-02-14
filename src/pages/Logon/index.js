import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

const Logon = () => {
    const [id, setId] = useState('');

    const history = useHistory();

    const handleLogin = (event) => {
        event.preventDefault();

        api.post('/sessions', { id })
            .then(({data}) => {
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', data.name);

                history.push('/profile');
            })
            .catch((error) => {
                alert("Erro ao tentar efetuar o login, tente novamente mais tarde");
                console.error('Login error >>>', error);
            })
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

export default Logon;