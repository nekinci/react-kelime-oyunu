import React from 'react';
import Kutucuk from './Kutucuk';

class Kutucuklar extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
        this.inputRefs = []; // input refsi tanımlıyoruz
        // daha sonra bu refs ile alt bileşenlere erişeceğiz.
        // ve ordaki inputa focuslanacagiz.
    }
 
    elementFocus(e,i){
        //harfe bastığında next'indeki inputa odaklan.
            if(i+1 !== this.props.harfler.length){
                this.inputRefs[i+1].input.focus();
            }
    }

    backFocus(e,i){
        //Backspace tuşuna bastığında önceki inputa dön
        if(e.keyCode === 8 && i>0){
            this.inputRefs[i-1].input.focus();return;
        }

        this.okTuslari(e,i);
    }

    // sag ve sol ok tuslariyla input focuslarini degistiriyoruz.
    okTuslari(e,i){
        if(e.keyCode === 37 && i>0){
            this.inputRefs[i-1].input.focus();
            this.inputRefs[i-1].input.select();
        }
        if(i+1 !== this.props.harfler.length && e.keyCode === 39){
            this.inputRefs[i+1].input.focus();
            this.inputRefs[i+1].input.select();

        }   
    }
    render(){
        
        return (
        <div className={'kutucuk-wrapper'}>
        {this.props.harfler.map((item, i) => (
            <Kutucuk 
                ref={e =>this.inputRefs[i] = e} 
                elementFocus={this.elementFocus.bind(this)} 
                backFocus = {this.backFocus.bind(this)} 
                key={i} id={i} 
                bg={this.props.bg[i]} 
                degistirebilme={this.props.degistirebilme[i]} 
                value={this.props.harfler[i]} 
                onChange = {e=>this.props.degis(e,i)}
            />
        ))}
        </div>
        )
        
    }
}

export default Kutucuklar;