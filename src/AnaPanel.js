import React from 'react';
import Kutucuklar from './Kutucuklar';
import Soru from './Soru';
import AracKutusu from './AracKutusu';
class AnaPanel extends React.Component{

    constructor(props){
        super(props);
        //states
        this.sorular = ['Türkiyenin başkenti neresidir?','Alanya','Antalya','Nevşehir','A','B','C'];
        this.cevaplar = ['ABCDEFGHJs','OK','ECE','ELA','DERE','KARE','SOĞUK'];
        this.soruNo = 0;
        this.state = {harfler:Array(this.cevaplar[this.soruNo].length).fill(''),degistirebilme:Array(this.cevaplar[this.soruNo].length).fill(true),bg:Array(this.cevaplar[this.soruNo].length).fill('white'),cevap:this.cevaplar[this.soruNo],soru:this.sorular[this.soruNo]};

        this.degis = this.degis.bind(this);
        this.kontrolEt = this.kontrolEt.bind(this);

        this.baslangic = 0;
        this.alfabe = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
        this.dizi = [];
        for (var i = 0; i < this.state.cevap.length; i++ ){
            this.dizi.push(i);
        }
        
    }



    harfAl(e){

        if(this.dizi.length === 0){
            alert('hata: bütün harfleri zaten aldınız.');
            return;
        }
        let indis = (Math.random() * 10) % this.dizi.length;
        
        this.indis =Math.floor(indis);
        console.log(this.indis);
        this.interval =
            setInterval(this.harfAlHelper.bind(this),60);
    }

    harfAlHelper(){
        let harfler = this.state.harfler.slice();
        if(this.baslangic <= 29){
            harfler[this.dizi[this.indis]] = (this.alfabe.charAt(this.baslangic++)).toString();
            this.setState({harfler: harfler});
        }
        else{
            console.log(this.dizi[this.indis]);
            harfler[this.dizi[this.indis]] = this.state.cevap.charAt(this.dizi[this.indis]).toString();
            let degistirebilme = this.state.degistirebilme.slice();
            degistirebilme[this.dizi[this.indis]] = false;
            let bg = this.state.bg.slice();
            bg[this.dizi[this.indis]] = 'yellow';
            this.setState({bg: bg});
            console.log(degistirebilme);
            this.setState({harfler: harfler,degistirebilme:degistirebilme});
            this.baslangic = 0;
            this.dizi.splice(this.indis,1);
            console.log(this.dizi);
            clearInterval(this.interval);
        }
    }

    keyup(e){
        if(e.keyCode === 32){
            this.harfAl();
        }
        if(e.keyCode === 13){
            this.kontrolEt();
        }
    }
    componentDidMount(){
        document.getElementsByClassName('panel')[0].focus();
        
    }

    kontrolEt(){
        var tmp = "";
        this.state.harfler.forEach(function(data,i){
            tmp+=data;
        });
        if(tmp === this.state.cevap){
            alert('tebrikler');
        }
        
        this.soruNo += 1;
        var cevap = this.cevaplar[this.soruNo];
        var soru = this.sorular[this.soruNo];
        this.setState(function(state,props){
            
            return {
                cevap: cevap,
                harfler: Array(cevap.length).fill(''),
                degistirebilme: Array(cevap.length).fill('true'),
                bg : Array(cevap.length).fill('white'),
                soru: soru
            };
        });
        this.dizi = [];
        for (var i = 0; i < cevap.length; i++ ){
            this.dizi.push(i);
        }
        
    }
    render(){

        return (
        <div className = {'panel'} onKeyUp={this.keyup.bind(this)} tabIndex={0}>
            
            <div className="center">
                <div className="skor-paneli">
                    <ul>
                        <li> <span><i className="mdi mdi-coin"></i> 0</span> </li>
                        <li> <span><i className="mdi mdi-clock"></i> 3:00</span> </li>
                    </ul>
                </div>
                <Soru soru={this.state.soru}/>
                <Kutucuklar bg = {this.state.bg} harfler={this.state.harfler} degis={this.degis} degistirebilme={this.state.degistirebilme} />
                <AracKutusu harfAl={this.harfAl.bind(this)} kontrolEt={this.kontrolEt} />
            </div>
        </div>
        );
    }

      
    degis(e,it){
        let x = e.target.value;
        if(x === '')
            return;
        x = x.toString().toUpperCase();
        let harfler = this.state.harfler.slice();
        harfler[it] = x;
        this.setState({ harfler: harfler });

        
        if(e.target.value !== '' && it+1 !== this.state.cevap.length)
            document.getElementById(it+1+'').focus();
    }
}

export default AnaPanel;