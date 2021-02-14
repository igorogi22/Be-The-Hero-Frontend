import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

const Profile = () => {
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        })
        .then(({data}) => {
            setIncidents(data);
        })
    }, [ongId]);

    const handleDeleteIncident = (id) => {
        api.delete(`/incidents/${id}`, {
            headers: {
                Authorization: ongId
            }
        })
            .then(() => {
                setIncidents(incidents.filter(incident => incident.id !== id));
            })
            .catch((error) => {
                alert('Erro ao tentar deletar o caso, tente novamente mais tarde');
                console.error('delete incident error >>>', error);
            });
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroes" />
                <span>Bem vinda, {ongName}!</span>

                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size="18" color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>
        
                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>
        
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
        
                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Profile;