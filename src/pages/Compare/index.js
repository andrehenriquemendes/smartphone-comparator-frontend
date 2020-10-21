import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Compare({ history }) {

    const [specs, setSpecs] = useState([]);
    
    useEffect(() => {
        async function loadSpecs() {
            const response = await api.get((window.location.pathname+window.location.search).substr(1));
            setSpecs(response.data);
        }
        
        loadSpecs();
    }, []);

    // Set Title 
    var titleHead = "";
    specs.map(phone => {
        titleHead = titleHead.concat(phone.name, " vs ")
    })
    titleHead = titleHead.substring(0, titleHead.length - 4);
    document.title = titleHead;

    function getRating(note) {
        var ratePixel;
        var background;
        if(note <= 2.5)
            background = "#E24222";
        else if(note <= 5)
            background = "#EC8509";
        else if(note <= 7.5)
            background = "#f1d32a";
        else if(note <= 9.5)
            background = "#7FD404";
        else
            background = "#00DD03"
        
        ratePixel = note * 150 / 10;

        return {
            backgroundColor: background,
            width: ratePixel
        };
    }

    function getOfertas(phone) {
            if(phone.linkMagalu === null) {
                return (<div className="itemOferta"><p className="withoutOffers">Não foram encontradas ofertas para esse produto</p></div>);
            } else {
                return (<div className="itemOferta"><a type="button" href={phone.linkMagalu} target="_blank" className="button">VER OFERTA</a></div>);
            }
    }


    function getRatingNote(phone, atr) {
        if(phone[atr] === null) {
            return (<div id="inline"><p className="note">Sem avaliações</p><div className="bar-rating"><div className="rating"></div></div></div>);
        } else {
            return (<div id="inline"><p className="note">{phone[atr]}</p><div className="bar-rating"><div className="rating" style={getRating(phone[atr])}></div></div></div>);
        }
    }


    function getYesOrNot(phone, atr) {
        if((phone[atr] === undefined) || (phone[atr] === null)) {
            return (<div className="itemSpec">Não</div>);
        } else {
            return (<div className="itemSpec">{phone[atr]}</div>);
        }
    }

    function getMultiLines(phone) {
        if(phone === null)
            return null;
        var p = [];
        var i;
        for(i=0; i<phone.length; i++) {
            p.push(<p id="p-multi">{phone[i].replace(/'/g, '')}</p>);
        }
        return p;
    }

    return(
        <>  
        <div className="full-white-background">
            <div className="comparePhones">
                        <div className="blankSpace"></div>
                        <div className="specRow" style={{border: 'none'}} >
                            <div className="labelImg"></div>
                            {specs.map(phone => (<div className="divImg"><img src={phone.mainimage} alt="" /></div>))}
                        </div>
                    <div className="specRow" id="fixedScroll">
                        <div className="labelName" style={{marginTop: 20}}>Dispositivo:</div>
                        {specs.map(phone => (<div className="itemSpec" style={{marginTop: 20}}><strong>{phone.name}</strong></div>))}
                    </div>
                    <div className="category"><p className="categoryTitle">Notas:</p></div>
                        <div className="specRow">
                            <div className="labelRating">Design e Material:</div>
                            {specs.map(phone => (getRatingNote(phone, 'kiDesignMaterial')))}
                        </div>
                        <div className="specRow">
                            <div className="labelRating">Desempenho e Hardware:</div>
                            {specs.map(phone => (getRatingNote(phone, 'kiHardware')))}
                        </div>
                        <div className="specRow">
                            <div className="labelRating">Câmera:</div>
                            {specs.map(phone => (getRatingNote(phone, 'kiCamera')))}
                        </div>
                        <div className="specRow">
                            <div className="labelRating">Conectividade:</div>
                            {specs.map(phone => (getRatingNote(phone, 'kiConnectivity')))}
                        </div>
                        <div className="specRow">
                            <div className="labelRating">Bateria:</div>
                            {specs.map(phone => (getRatingNote(phone, 'kiBattery')))}
                        </div>
                    
                    <br /><br />
                    <div className="category"><p className="categoryTitle">Informações Principais</p>
                        <div className="specRow">
                            <div className="labelName">Marca:</div>
                            {specs.map(phone => (<div className="itemSpec">{phone.brand}</div>))}
                        </div>
                        <div className="specRow">
                            <div className="labelName">Data de lançamento:</div>
                            {specs.map(phone => (<div className="itemSpec">{phone.release}</div>))}
                        </div>
                        <div className="specRow">
                            <div className="labelName">Câmera principal:</div>
                            {specs.map(phone => (<div className="itemSpec">{phone.maincamera}</div>))}
                        </div>
                        <div className="specRow">
                            <div className="labelName">Tamanho da tela:</div>
                            {specs.map(phone => (<div className="itemSpec">{phone.inches}</div>))}
                        </div>
                        <div className="specRow">
                            <div className="labelName">Memória:</div>
                            {specs.map(phone => (<div className="itemSpec">{phone.internalmem}</div>))}
                        </div>
                        <div className="specRow">
                            <div className="labelName">Bateria:</div>
                            {specs.map(phone => (<div className="itemSpec">{phone.battery}</div>))}
                        </div>
                    </div>
                    <br /><br /><br /><br />
                    
                    <div className="oferta"><p className="categoryTitle" id="ofertaTitle">Ofertas:</p>
                        <div className="specRow">
                            <div className="labelName" style={{color: "#333333"}}><strong>Magazine Mestre Phones</strong><br /><br /><p style={{fontSize: 12}}>Loja parceira da Magazine Luiza</p></div>
                            {specs.map(phone => (getOfertas(phone)))}
                        </div>
                    </div>
                    <br /><br /><br /><br />

                    

                    <div className="category"><p className="categoryTitle">Ficha técnica completa</p>
                    <br />
                        <div className="subCategory"><spam><i className="fas fa-microchip" /><p className="subCategoryText">Desempenho e hardware:</p></spam>
                            <div className="specRow">
                                <div className="labelName">Sistema Operacional:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.os}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Processador (CPU):</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.cpu}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Chipset:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.chipset}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Processador Gráfico (GPU):</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.gpu}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Memória Interna:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.internalmem}</div>))}
                            </div>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName">Memória Externa:</div>
                                {specs.map(phone => (getYesOrNot(phone, 'externalMem')))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-cogs" /><p className="subCategoryText">Características:</p></spam>
                            <div className="specRow">
                                <div className="labelName">Dimensões:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.dimensions}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Peso:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.weight}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Material:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.material}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Cores:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.colors}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Bateria:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.battery}</div>))}
                            </div>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName">Duração da bateria:</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.batterylife)}</div>))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-mobile-alt" /><p className="subCategoryText">Tela:</p></spam>
                            <div className="specRow">
                                <div className="labelName">Tecnologia:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.technology}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Número de cores:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.numbercolors}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Tamanho:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.inches}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Área da tela:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.screenarea}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Formato:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.format}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Resolução:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.resolution}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Densidade de pixels:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.pixelsdensity}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Proteção:</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.protection)}</div>))}
                            </div>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName">Outros recursos de tela:</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.screenextrafeatures)}</div>))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-camera" /><p className="subCategoryText">Câmera:</p></spam>
                            <div className="specRow">
                                <div className="labelName">Câmera principal:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.maincamera}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Especificações (câmera principal):</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.mainespecifications)}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Funções (câmera principal):</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.mainfunctions)}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Resolução de vídeo (câmera principal):</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.mainvideo}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Câmera frontal:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.selfiecamera}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Especificações (câmera frontal):</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.selfieespecifications)}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Funções (câmera frontal):</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.selfiefunctions)}</div>))}
                            </div>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName">Resolução de vídeo (câmera frontal):</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.selfievideo)}</div>))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-wifi" /><p className="subCategoryText">Conectividade:</p></spam>
                            <div className="specRow">
                                <div className="labelName">Chip (cartão SIM):</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.sim}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Rede:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.network}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Velocidade:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.speed}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">GPRS:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.gprs}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Edge:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.edge}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Wi-Fi:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.wifi}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">NFC:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.nfc}</div>))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">USB:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.usb}</div>))}
                            </div>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName">Bluetooth:</div>
                                {specs.map(phone => (<div className="itemSpec">{phone.bluetooth}</div>))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-rss" /><p className="subCategoryText">Sensores:</p></spam>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName"></div>
                                {specs.map(phone => (<div className="itemSpec" style={{textAlign: 'left'}}>{phone.sensors}</div>))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-music" /><p className="subCategoryText">Áudio e Música:</p></spam>
                            <div className="specRow" >
                                <div className="labelName">Rádio</div>
                                {specs.map(phone => (getYesOrNot(phone, 'radio')))}
                            </div>
                            <div className="specRow">
                                <div className="labelName">Entrada Jack para fones de ouvido:</div>
                                {specs.map(phone => (getYesOrNot(phone, 'headphonejack')))}
                            </div>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName" >Outros recursos:</div>
                                {specs.map(phone => (<div className="itemSpec">{getMultiLines(phone.others)}</div>))}
                            </div>
                        </div>
                        <br /><br />
                        <div className="subCategory"><spam><i className="fas fa-music" /><p className="subCategoryText">Outras Especificações:</p></spam>
                            <div className="specRow" style={{border: 'none'}}>
                                <div className="labelName"></div>
                                {specs.map(phone => (<div className="itemSpec" style={{textAlign: 'left'}}>{getMultiLines(phone.otherfeatures)}</div>))}
                            </div>
                        </div>
                    </div>
            </div>


            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
        </>
    );
}