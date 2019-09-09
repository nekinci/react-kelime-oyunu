import React from 'react';

class Kutucuk extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
        this.input = null;
    }
    componentDidMount(){
    }

    keypress(e){

        // Eğer değiştirilemez olarak işaretlenmişse klavyeye bastığında hiç birşey yapma.
        if(this.props.degistirebilme === false){
            e.preventDefault();
            //TODO bilgilendirme yapılabilir.
            return;
        }
        // Space tuşunu harf alma fonksiyonuna rezerve ettiğimiz için space tuşuna bastığımızda
        // Hiç birşey yazmamasını emrettik.
        if(e.keyCode === 32){
            e.preventDefault();
            return;
        }
        
    }

    render(){
        return <input 
            ref = {e=>this.input = e} 
            onKeyDown={this.keypress.bind(this)} 
            onKeyPress = {e=>this.props.elementFocus(e,this.props.id)}
            onKeyUp = {e=>this.props.backFocus(e,this.props.id)}
            id={this.props.id} 
            style={{backgroundColor:this.props.bg}} 
            value={this.props.value} 
            onChange = {this.props.onChange} 
            type={'text'} 
            className={'kutucuk'}
            maxLength={1} 
         />;
    }
    
}

export default Kutucuk;