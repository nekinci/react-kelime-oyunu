import React from 'react';

class Soru extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
         
            <div className="soru-wrapper">
                <div className="title">
                   <span>Kelime Oyunu</span>
                </div>
                <div className={'soru'}>
                    <span className="">{this.props.soru}</span>
                </div>
            </div>
        );
    }
}

export default Soru;

