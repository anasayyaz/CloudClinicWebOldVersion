import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    DialogTitle, Dialog, DialogActions, DialogContent
} from '@material-ui/core';
import {
    History, FileCopy, NoteAdd, Person, Refresh, Share, Print, Close
} from '@material-ui/icons';

class PopUp extends React.Component{
	render(){
        let {$class, buttons, content, name, show, title, width} = this.props;
        return (
            <Dialog
                open={show}
                onClose={() => { $class.setState({ [name]: false }) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="false"
                scroll="body"
            >
                <div style={{ width: width }}>
                    <DialogTitle 
                        id="alert-dialog-title" 
                        style={{marginTop: "0px", color: "white", background: "#007bff"}}
                    >
                        {title}
                        <Close 
                            className="float-right" 
                            onClick={() => { 
                                $class.setState({ [name]: false }) 
                            }}
                            style={{cursor:'pointer'}}
                        />
                    </DialogTitle>
                    <DialogContent>
                        {content}
                    </DialogContent>
                    <DialogActions>
                        <div className="modal-footer" style={{width:"100%"}}>
                            {
                                buttons.map((btn)=>{
                                    return <button 
                                        type="button" 
                                        className={btn.className} 
                                        data-dismiss="modal"
                                        onClick={() => { 
                                            btn.action !== "" && (btn.action === "setState" ? $class.setState({ [name]: false }) : $class[btn.action]())
                                        }}
                                    >
                                        {/* <span className="material-icons align-middle text-light"> */}
                                            {btn.title}
                                        {/* </span> */}
                                    </button>
                                })
                            }
                        </div>
                    </DialogActions>
                </div>
            </Dialog>

		);

	}
}

export default withRouter(PopUp);