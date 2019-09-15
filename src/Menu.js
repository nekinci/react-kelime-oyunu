import React from 'react';
import mp3file from './sounds/zap1.mp3';
import Modal from './Modal';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            geriButonu: 'navigation-buton',
            sayim: "3",
            view: ""
        }
        this.dizi = ["3", "2", "1", "Başla"];
        this.counter = 0;
        this.intervall = this.intervall.bind(this);
        this.viewDegis = this.viewDegis.bind(this);
        this.viewGoster = this.viewGoster.bind(this);
    }

    display1() {
        this.setState({
            geriButonu: 'navigation-buton show'
        });

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    intervall() {

        if (this.counter === this.dizi.length) {
            clearInterval(this.interval);
            return;
        }
        this.audio = new Audio(mp3file);
        this.audio.play();
        this.setState({ sayim: this.dizi[this.counter++] });

    }
    componentDidMount() {
        //this.interval = setInterval(this.intervall,800);
    }

    viewDegis(val) {
        this.setState({
            view: val
        });
    }

    viewGoster() {
        if (this.state.view === "ayarlar") {
            return <Modal viewDegis={this.viewDegis} title={"Ayarlar"}>
                Ayarlar buraya gelecek.
            </Modal>;
        }

        else if (this.state.view === "hakkinda") {
            return <Modal viewDegis={this.viewDegis} title={"Hakkında"}>

                <div className="hakkinda">
                    2019 yılında <strong>Niyazi Ekinci</strong> tarafından yapılmıştır.
                    <div style={{paddingTop:5+'px'}}>
                        Powered by ReactJS
                        ,NodeJS and MongoDB
                    </div>
                    <a href={"https://github.com/nekinci"} target={"_blank"}>Github</a><div></div>
                    <a href={"https://www.linkedin.com/in/niyazi-ekinci-a2043bab/"} target={"_blank"}>Linkedin</a><div></div>
                    <a href={"/"} >Web Sitem</a>
                </div>
            </Modal>
        }

        else if(this.state.view === "siralama"){
            return <Modal title={"Sıralama"} viewDegis={this.viewDegis}>
                Siralama buraya gelecek.
            </Modal>;
        }
    }
    render() {

        return (

            <div style={{ width: 100 + '%' }}>
                {
                    this.state.view ? this.viewGoster() : ""
                }
                <div className="center center-menu">
                    <div className="menu-title">
                        <div className="ortala">KELiME OYUNU</div>
                    </div>

                    <div className="menu">
                        <div className="navigation">
                            <button className={this.state.geriButonu}><i className="mdi mdi-undo-variant"></i></button>
                        </div>
                        <button className="menu-buton" onClick={() => { this.props.durumDegis("oyun") }}><i className="mdi mdi-play-circle"></i> Yeni Oyun</button>
                        <button className="menu-buton" onClick={()=>this.viewDegis("siralama")}><i className="mdi mdi-trophy-award"></i> Sıralama</button>
                        <button className="menu-buton" onClick={()=>this.viewDegis("ayarlar")}><i className="mdi mdi-settings"></i> Ayarlar</button>
                        <button className="menu-buton" onClick={()=>this.viewDegis("hakkinda")} ><i className="mdi mdi-information"></i> Hakkında</button>

                    </div>


                </div>
            </div>

        );
    }
}


export default Menu;