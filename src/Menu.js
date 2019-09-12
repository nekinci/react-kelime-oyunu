import React from 'react';
import mp3file from './sounds/zap1.mp3';

class Menu extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            geriButonu : 'navigation-buton',
            sayim: "3"
        }
        this.dizi = ["3","2","1","Başla"];
        this.counter = 0;
        this.intervall = this.intervall.bind(this);

    }

    display1(){
        this.setState({
            geriButonu : 'navigation-buton show'
        });

    }
    intervall(){
        if(this.counter  === this.dizi.length){
            clearInterval(this.interval);
            return;
        }
        this.audio = new Audio(mp3file);
        this.audio.play();
        this.setState({sayim: this.dizi[this.counter++]});

    }
    componentDidMount(){
        this.interval = setInterval(this.intervall,800);
    }
    render(){
        
        return (

            <div className="center center-menu">
            
            <div className="menu-title">
                <div className="ortala">KELİME OYUNU</div>
            </div>
                
            <div className="menu">
                <div className="navigation">
                    <button className={this.state.geriButonu}><i className="mdi mdi-undo-variant"></i></button>                        
                </div>
                <button className="menu-buton"  onClick={()=>{this.props.durumDegis("oyun")}}><i className="mdi mdi-play-circle"></i> Yeni Oyun</button>
                <button className="menu-buton" onClick={()=>this.display1()}><i className="mdi mdi-trophy-award"></i> Sıralama</button>
                <button className="menu-buton" onClick={()=>this.props.durumDegis("ayarlar")}><i className="mdi mdi-settings"></i> Ayarlar</button>
                <button className="menu-buton" onClick={()=>this.props.durumDegis("hakkinda")}><i className="mdi mdi-information"></i> Hakkında</button>

            </div>

            <div className="modal">

            </div>
        </div>
        
       );
    }
}


export default Menu;