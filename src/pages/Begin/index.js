import React from 'react';

import comparadorImg from '../../assets/comparador.png';

import './styles.css';

export default function Begin({ history }) {
    document.title = 'Comparador de Smartphones - Mestre Phone';

    function handleSubmit(event) {
        event.preventDefault();

        history.push('/select');
    }

    return(
        <>  <img src={comparadorImg} className="vsImg" />
            <p className="normal" >
                Selecione até 3 celulares e compare suas características, desempenho, design, bateria, câmera e conectividade.
            </p>
            <form onSubmit={handleSubmit}>
                <button className="btn" type="submit">COMEÇAR</button>
            </form>
            
        </>
    );
}