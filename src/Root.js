import React from 'react';
import Menu from './Menu';
import AnaPanel from './AnaPanel';


class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: "menu"
        };
        this.durumDegis = this.durumDegis.bind(this);
    }

    durumDegis(viewName) {
        this.setState({
            view: viewName
        });
    }

    render() {
        return <Sonuc view = {
            this.state.view
        }
        durumDegis = {
            this.durumDegis
        }
        />
    }
}


function Sonuc(props) {
    if (props.view === "menu") {
        return <Menu durumDegis = {
            props.durumDegis
        }
        />;
    }
    if (props.view === "oyun") {
        return <AnaPanel / > ;
    }
}
export default Root;