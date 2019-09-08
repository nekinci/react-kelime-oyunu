import React from 'react';
import Kutucuk from './Kutucuk';

class Kutucuklar extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
       
    }
 
    componentDidMount(){
    }

    componentWillUnmount(){

    }
   
    render(){
        
        return (
        <div className={'kutucuk-wrapper'}>
        {this.props.harfler.map((item, i) => (
            <Kutucuk key={i} id={i} bg={this.props.bg[i]} degistirebilme={this.props.degistirebilme[i]} value={this.props.harfler[i]} onChange = {e=>this.props.degis(e,i)}/>
        ))}
        </div>
        )
        
    }
}

export default Kutucuklar;