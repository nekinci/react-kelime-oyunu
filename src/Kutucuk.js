import React from 'react';


class Kutucuk extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }
    componentDidMount(){
    }

    keypress(e){
        if(this.props.degistirebilme === false){
            e.preventDefault();
            //TODO bilgilendirme yapılabilir.
        }
        if(e.keyCode === 32)
            e.preventDefault();
    }

    render(){
        return <input  onKeyUp={e=>e.preventDefault()} id={this.props.id} style={{backgroundColor:this.props.bg}} onKeyDown={this.keypress.bind(this)} value={this.props.value} onChange = {this.props.onChange} type={'text'} className={'kutucuk'} maxLength={1} />;
    }
    
}

export default Kutucuk;