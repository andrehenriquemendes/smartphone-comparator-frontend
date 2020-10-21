import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function Select({ history }) {
    document.title = 'Comparador de Smartphones - Mestre Phone';

    const [smartphones, setSmartphones] = useState([{id: "", name: "", brand: ""}]);

    const [smartToCompare, setSmartToCompare] = useState([]);
    
    useEffect(() => {
        async function loadSmartphoneNames() {
            const response = await api.get('/smartphones');

            setSmartphones(response.data);
        }
        
        loadSmartphoneNames();
    }, []);

    function warningPrint(msg) {
        const warningDiv = document.getElementById('warning');
        const node = document.createElement('p');
        const text = document.createTextNode(msg);

        node.appendChild(text);

        if(warningDiv.childElementCount > 0) {
            warningDiv.removeChild(warningDiv.childNodes[0]);
        }

        warningDiv.appendChild(node);

    }

    function clearInput() {
        document.getElementById("selector").value = "";
    }


    function getSmartphone() {
        const name = document.getElementById("selector").value;
        const i = smartphones.find( smart => smart.brand.concat(" ", smart.name) === name );
        var numSmartphoneCompare = document.getElementById("list-smartphones").childElementCount;
        if(numSmartphoneCompare === 3) {
            warningPrint("Número máximo de smartphones já selecionados.");
            clearInput();
        } else {
            if(i === undefined) {
                warningPrint("Selecione um smartphone da lista");
                clearInput();
            } else {
                if(smartToCompare.includes(i)){
                    warningPrint("Smartphone já selectionado.");
                    clearInput();
                } else {
                    if(name === "") {
                        warningPrint("Selecione um smartphone para comparar.");
                        clearInput();
                    } else {
                        setSmartToCompare([...smartToCompare, i]);
                        
                        // Delete Button
                        var icon = document.createElement('i');
                        icon.className= "fas fa-times";
                        icon.addEventListener("click", function() {
                            setSmartToCompare(smartToCompare.filter((e) => (e.brand.concat(" ", e.name) === name)));
                        });

                        var p = document.createElement("p");
                        var node = document.createElement("li");
                        var text = document.createTextNode(i.brand.concat(" ", i.name));
                        p.appendChild(text);

                        node.appendChild(icon);
                        node.appendChild(p);
                        document.getElementById("list-smartphones").appendChild(node);
                        clearInput();
                    }
                }
            }
        }
    }

    function assemblyParams() {

        // Get vector id
        var ids = [];
        var i;
        var len = smartToCompare.length;
        for(i=0; i<len; i++) {
            ids.push(smartToCompare[i].id);
        }
        
        // Concat text
        var text = "?";
        for(i=0; i<ids.length; i++) {
            text = text.concat("&id=", String(ids[i]));
        }

        return text;
    }

    function goToCompare(event) {
        event.preventDefault();

        if(smartToCompare.length < 2) {
            warningPrint('Selecione pelo menos 2 celulares para comparar');
            return false;
        } else {
            var route = "";
            route = route.concat("/compare", assemblyParams());
            
            history.push(route);
        }
    }

    return(
        <>
        <div className="white-background">
            <p className="normalBlack">Escolha até <strong>3 celulares</strong> para comparar</p>
            <div id="warning"></div>
            <div className="select-plus">
                <form>
                    <input type="text" id="selector" list="name-list" placeholder="Digite o nome do celular"/>
                        <datalist id="name-list">
                            {smartphones.map(smartphone => (
                                <option key={smartphone.id}>
                                    {smartphone.brand} {smartphone.name}
                                </option>
                            ))}
                        </datalist>
                    <button className="btn-plus-icon" type="button" onClick={() => getSmartphone()}>
                        Adicionar
                    </button>
                </form>
            </div>
            <div className="smartphones-to-compare">
                <ul id="list-smartphones"></ul>
            </div>
            <form onSubmit={goToCompare}>
                <button className="btn" type="submit">COMPARAR</button>
            </form>
        </div>
        </>
    );
}