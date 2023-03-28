import React from "react";
import { TextField, Button, Icon, Snackbar, withStyles } from "@material-ui/core";
import {connect} from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import {post} from '../../_helper/api';
import TranslationContext from "../../context/translation";


const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	
	button: {
		margin: theme.spacing(1)
	},
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
});

class ChangePassord extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.user={
      userId:'', OldPassword:'', NewPassword:'', ConfirmPassword:'',
    }
    this.validation={
      OldPassword:false, NewPassword:false, ConfirmPassword:false,
    }
    this.alert={
      open: false, 
      severity: '',
      message:'',
      title:''
  }
    this.state = {
      user:this.user,
      validation: this.validation,
      alert: this.alert
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let [key, value, {user, validation}] = [event.target.name, event.target.value, this.state];
    user[key] = value;
    if(validation[key]){
      if(key === "OldPassword"){
        validation[key] = user[key] ? false : true;
      }else{
        validation[key] = user[key].length >= 8 ? false : true;
      }
    }
    this.setState({ user });
  }
  handleSubmit(){
    let {user, validation} = this.state;
        let isSubmit = null;
        Object.keys(validation).map((key)=>{
            if(key === "OldPassword"){
              validation[key] = user[key] ? false : true;
              isSubmit = user[key] && isSubmit !== false ? true : false;
            }
            else if(key === "ConfirmPassword"){
              validation[key] = user[key] === user['NewPassword'] ? false : true;
              isSubmit = user[key].length >= 8 && user[key] === user['NewPassword'] && isSubmit !== false ? true : false;
            }
            else{
              validation[key] = user[key].length >= 8 ? false : true;
              isSubmit = user[key].length >= 8 && isSubmit !== false ? true : false;
            }
        })
        this.setState({validation});

        isSubmit && post('accounts/ChangePassword', user).then((response)=>{
            this.setState({alert:{open:true, severity:"success", title:"success", message:'Password Changed Sucessfully'}})
            setTimeout(()=>{this.props.history.push('/dashboard')}, 1000)
        }).catch((error)=>{
         
            this.setState({alert:{open:true, severity:"error", title:"Error", message:error.response.data.modelState[""][0]}})
        })
  }  
  handleClose(){
      this.setState({alert:{open:false, severity: '', message:'' }})
  }
  componentDidMount(){
    let [userId, {user}] = [JSON.parse(localStorage.getItem("user")), this.state];
    user['userId'] = userId
    this.setState({user});
  }
  render() {
    let {user, validation, alert:{open, severity, message, title}} = this.state;
    const { translate } = this.context;
    const { classes } = this.props;
    return (
      <React.Fragment>
      <Snackbar open={open}                  autoHideDuration={2000}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                anchorOrigin={{ vertical:'top', horizontal:'right' }} onClose={()=>{this.handleClose()}}>
          <Alert onClose={()=>{this.handleClose()}} severity={severity}>
              <AlertTitle>{title}</AlertTitle>
              <strong>{message}</strong>
          </Alert>
      </Snackbar> 
      <form noValidate autoComplete="off"> 
        <div className="row">
          <div className="col-md-4">
            <h4>{translate("CHANGE_PASSWORD")}</h4>
          </div>
        </div>
        <hr></hr>

        <div className="form-horizontal">
          <div className="form-body">
            <div className="form-group row">
              <div className="col-md-6">
                <TextField
                  name="OldPassword" 
                  label=  {translate("OLD_PASSWORD")}
                  className={classes.textField}
                  value={user.OldPassword}
                  onChange={(e)=>{this.handleChange(e)}}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  error={validation['OldPassword']}
                  helperText={validation['OldPassword'] && 'this field is required'}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-6">
                <TextField
                  name="NewPassword" 
                  label=  {translate("NEW_PASSWORD")}
                  className={classes.textField}
                  value={user.NewPassword}
                  onChange={(e)=>{this.handleChange(e)}}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  error={validation['NewPassword']}
                  helperText={validation['NewPassword'] && 'Password must be at least 8 characters'}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-6">
                <TextField
                  name="ConfirmPassword" 
                  label=  {translate("CONFIRM_PASSWORD")}
                  className={classes.textField}
                  value={user.ConfirmPassword}
                  onChange={(e)=>{this.handleChange(e)}}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  error={validation['ConfirmPassword']}
                  helperText={validation['ConfirmPassword'] && 'Password and confirm password does not match'}
                />
              </div>
            </div>
            <div className="col-md-6 text-right">
              <Button variant="contained" class="w-25 border-0 shadow btn btn-info cc-btn"  className="{classes.button}" onClick={()=>{this.handleSubmit()}}>
                  {translate("SUBMIT")}
              </Button>
            </div>
          </div>
        </div>
      </form>
</React.Fragment>     
    );
  }
}

export default connect(null, null)(withStyles(styles)(ChangePassord))