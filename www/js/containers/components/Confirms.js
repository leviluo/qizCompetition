import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

export default class Confirms extends Component {

    state = {
      openstate: true
    }

    hideModal = () =>{
      this.setState({openstate: this.state.openstate == false ? true :false});
    }

    render() {
      const styles = require('./index.scss');
        return (
          <Modal show={this.props.open == this.state.openstate} 
          dialogClassName="custom-modal" animation={false}>
          <Modal.Body style={{textAlign:'center'}}>
              <button className="close" onClick={this.hideModal}>&times;</button>
            {this.props.ConfirmText}
          </Modal.Body>
          <Modal.Footer className={styles.modalfooteradd}>
            <a onClick={this.hideModal}>取消</a>
            <a onClick={this.props.confirm}>确认</a>
          </Modal.Footer>
        </Modal>
        )
    }
}




      

