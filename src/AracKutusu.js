import React from 'react';


class AracKutusu extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }
    // Harf alma ve Cevapla ma butonları burada.
    render(){
        return <div className="arackutusu">
            <div className="buton-wrapper">
                <button type="button" className="harf-al" onClick={e=>this.props.harfAl(e)}>Harf Al (Space)</button>
                <button type="button" className="cevapla" onClick={e=>this.props.kontrolEt(e)}>Cevapla (Enter)</button>
            </div>
        </div>;
    }
}

export default AracKutusu;