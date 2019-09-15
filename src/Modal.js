import React from 'react';


class Modal extends React.Component{
    
    constructor(props){
        super(props);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose(){
        this.refs.modal.style.display = "none";
        this.props.viewDegis("");
    }
    render(){
        return (
            <div className="modal" ref="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-title">{this.props.title}
                    </span>
                    <button onClick={this.modalClose.bind(this)} className="close">&times;</button>
                </div>
                <div className="modal-body">
                    {this.props.children}
                </div>
                <div className="modal-footer">
                    <button onClick={this.modalClose.bind(this)} className="modal-btn">Kapat</button>
                </div>
            </div>
        </div>
        );
    }
}


export default Modal;