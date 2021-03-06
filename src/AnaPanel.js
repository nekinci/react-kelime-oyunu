import React from 'react';
import Kutucuklar from './Kutucuklar';
import Soru from './Soru';
import AracKutusu from './AracKutusu';
import mp3file from './sounds/typing.mp3';
import coin from './sounds/coin.wav';
import tick from './sounds/tick.mp3';

class AnaPanel extends React.Component {

    constructor(props) {
        super(props);
        //states

       
        this.sorular = ['Türkiyenin başkenti neresidir?', 'Soru 2', 'Soru 3', 'Soru 4', 'Soru 5', 'Soru 6', 'Soru 7'];
        this.cevaplar = ['ANKARA', 'OK', 'ECE', 'ELA', 'DERE', 'KARE', 'SOĞUK'];
        this.soruNo = 0;
        this.state =
            {
                harfler: Array(this.cevaplar[this.soruNo].length).fill(''),
                degistirebilme: Array(this.cevaplar[this.soruNo].length).fill(true),
                bg: Array(this.cevaplar[this.soruNo].length).fill('white'),
                cevap: this.cevaplar[this.soruNo],
                soru: this.sorular[this.soruNo],
                puan: 0,
                sure: "3:00"
            };
        this.sure = 15;
        this.degis = this.degis.bind(this);
        this.kontrolEt = this.kontrolEt.bind(this);

        this.baslangic = 0;
        this.alfabe = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
        this.dizi = [];
        for (var i = 0; i < this.state.cevap.length; i++) {
            this.dizi.push(i);
        }

        this.geriSayim = this.geriSayim.bind(this);

    }



    geriSayim() {
        var sayim = new Audio(tick);
        sayim.volume = 0.4;
        sayim.play();
        this.sure--;
        var dakika = Math.floor(this.sure / 60);
        var saniye = this.sure % 60;
        var sure = "";
        if (saniye < 10)
            sure = "0" + dakika + ":0" + saniye;
        else
            sure = "0" + dakika + ":" + saniye;

        this.setState({ sure: sure });
        if (this.sure === 0) {
            clearInterval(this.interval1);
            console.log('süre bitti');
        }
    }

    harfAl(e) {

        // İlk önce cevap uzunluğu kadar dizi boyutu ayarlarız ve o dizide indisleri tutarız ki
        // Rasgele bir yere harf aldığımızda tekrar aynı yere harf almamak için dizi 
        // indislerini kontrol ederiz.
        if (this.dizi.length === 0) { // Eğer bütün harfler alınmışsa tekrar harf almaz ve uyarı verir.
            alert('hata: bütün harfleri zaten aldınız.');
            return;
        }

        // Eğer dizide hala yer varsa yani hala tüm harfler alınmamışsa yeni bir randomla 
        // harf alırız.
        // sonra animasyonu oynatmak için interval'i çağırırız.
        // 29 * 60 milisaniye sonra ilgili yerin harfini verir.
        // 29 * 60 milisaniye ise A 'dan Z'ye tüm harfleri animasyon şeklinde göstermek için.

        // İlk başta randomu alıyoruz dizinin indisinin moduna göre dizinin boyutu her harf almada 1 eksilir
        // daha sonra aldığımız virgüllü indisi bir alt tam sayıya yuvarlarız. Floor fonksiyonu ile.
        let indis = (Math.random() * 10) % this.dizi.length;
        this.indis = Math.floor(indis);
        this.interval =
            setInterval(this.harfAlHelper.bind(this), 60);
    }

    harfAlHelper() {
        //Önce State deki harfleri local variable'a aktarırız.
        let harfler = this.state.harfler.slice();
        //this.baslangic = 0 olarak daha önce tanımlamıştık 
        //eğer baslangic kücükse 29dan burayı çalıştır
        //burda ise her seferinde daha önce tanımladığımız
        //alfabe stringinin indislerini indise yazdırırız ve state'i değiştiririz.
        if (this.baslangic <= 29) {
            harfler[this.dizi[this.indis]] = (this.alfabe.charAt(this.baslangic++)).toString();
            this.setState({ harfler: harfler });
        }
        //29 a ulaştığımızda ise artık gerçek gelmesi gereken harfi
        //ilgili yere koyarız.
        else {
            //this.indis < this.dizi.length olduğu için daha önce dizinin
            // içinde tanımladığımız indislere erişiriz ve harfleri değiştirirz gerçek olanla
            // ve bu ilgili indisin değiştirilebilirliğini kapatır arka planını sarı yaparız.
            harfler[this.dizi[this.indis]] = this.state.cevap.charAt(this.dizi[this.indis]).toString();
            let degistirebilme = this.state.degistirebilme.slice();
            degistirebilme[this.dizi[this.indis]] = false;
            let bg = this.state.bg.slice();
            bg[this.dizi[this.indis]] = 'yellow';
            this.setState({ bg: bg });
            this.setState({ harfler: harfler, degistirebilme: degistirebilme });

            //sonra baslangici tekrar 0 a eşitlerizki daha sonra ki kullanımlar da kullanılabilsin
            this.baslangic = 0;

            //sonra aldığımız dizi elemanını diziden sileriz.
            // daha sonra ise intervali temizle yaparak durduruz.
            this.dizi.splice(this.indis, 1);
            clearInterval(this.interval);
        }
    }

    keyup(e) {
        //Eğer Space tuşuna basarsa harf alma fonksiyonunu çağır.
        if (e.keyCode === 32) {
            this.harfAl();
        }
        //Eğer Enter tuşuna basarsa kontrol etme fonksiyonunu çağır.
        if (e.keyCode === 13) {
            this.kontrolEt();
        }
    }
    componentDidMount() {
        //Component yaratıldıktan sonra panel ' e focuslanıyoruz ki Enter ve Space tuşlarını dinleyebilelim.
        document.getElementsByClassName('panel')[0].focus();
        this.interval1 = setInterval(this.geriSayim, 1000);
    }

    kontrolEt() {

        //Soru Puanı Cevabın puanı * 100  olarak hesaplanır
        //Eğer doğru bilirse bu puan verilir eğer bilinmezse bu puan state teki puandan eksilir.
        this.puan = this.state.cevap.length * 100;

        this.x = 0;
        // Eğer harf alındıysa degiştirebilmeyi false yaparız ve o input değiştirilemez
        // değiştirilemeyen inputları sayarak
        // puan hesaplamasında kullanacağız.

        // Arg : x => Alınan Harf Sayısı

        this.state.degistirebilme.map((i, k) => {
            if (!i) this.x++;
            return i;
        });
        this.puan = this.puan - (this.x * 100);
        var tmp = "";
        //harflerden cevabın toplamını al tmp'e aktar.
        this.state.harfler.forEach(function (data, i) {
            tmp += data;
        });

        // Eğer doğru cevapsa puanı güncelle
        if (tmp === this.state.cevap) {
            alert('tebrikler');
            this.yeniPuan = this.state.puan + this.puan;
            this.setState({
                puan: this.yeniPuan
            });
            new Audio(coin).play();
        }
        //Eğer yanlış cevapsa puanı güncelle
        else {
            this.yeniPuan = this.state.puan - (this.state.cevap.length * 100);
            this.setState({ puan: this.yeniPuan });
        }
        //Doğru da cevaplasa yanlışda cevaplasa soruyu değiştiriyoruz.
        this.soruNo += 1;

        // Cevap ve Soruyu soru numarasına göre güncelliyoruz.
        var cevap = this.cevaplar[this.soruNo];
        var soru = this.sorular[this.soruNo];
        //State'i yeni soru ve cevaba göre değiştiriyoruz ki UI'de DOM güncellemesi yapsın
        this.setState(function (state, props) {

            return {
                cevap: cevap,
                harfler: Array(cevap.length).fill(''),
                degistirebilme: Array(cevap.length).fill('true'),
                bg: Array(cevap.length).fill('white'),
                soru: soru
            };
        });

        //Harf Al (Space) bastığında animasyon oynatması için
        this.dizi = [];
        for (var i = 0; i < cevap.length; i++) {
            this.dizi.push(i);
        }

    }


    degis(e, it) {
        //Harfe basıldığında büyük harfe çevir ardından state 'i güncelle.
        this.audio = new Audio(mp3file);
        this.audio.play();
        let x = e.target.value;
        x = x.toString().toUpperCase();
        let harfler = this.state.harfler.slice();
        harfler[it] = x;
        this.setState({ harfler: harfler });


    }

    //Render Function
    render() {

        return (
            <div className={'panel'} onKeyUp={this.keyup.bind(this)} tabIndex={0}>
                <div className="center">
                    <div className="skor-paneli">
                        <ul>
                            <li> <span><i className="mdi mdi-trophy-variant"></i> {this.state.puan}</span> </li>
                            <li> <span><i className="mdi mdi-clock"></i> {this.state.sure}</span> </li>
                        </ul>
                    </div>
                    <Soru
                        soru={this.state.soru}
                    />
                    <Kutucuklar
                        gerigit={this.geriGit}
                        bg={this.state.bg}
                        harfler={this.state.harfler}
                        degis={this.degis}
                        degistirebilme={this.state.degistirebilme}
                    />
                    <AracKutusu
                        harfAl={this.harfAl.bind(this)}
                        kontrolEt={this.kontrolEt}
                    />
                </div>
            </div>
        );
    }


}

export default AnaPanel;