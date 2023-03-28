import React from "react";
import { TextField,withStyles } from "@material-ui/core";
import {connect} from 'react-redux';
import list from '../../_helper/api';
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

class ChangePassword extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.user={
      userId:'', OldPassword:'', NewPassword:'', ConfirmPassword:'',
    }
    this.state = {
      user:this.user,
    };

  }
  componentDidMount(){
    let [userId, {user}] = [JSON.parse(localStorage.getItem("user")), this.state];
    user['userId'] = userId
    list(`accounts/user/${userId}`).then((response)=>{
     
    this.setState({user:response.data});
    })
  }
  render() {
    const { translate } = this.context;
    let {user} = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
      <form noValidate autoComplete="off"> 
        <div className="row">
          <div className="col-md-4">
            <h4>{translate("USER_PROFILE")}</h4>
          </div>
        </div>
        <hr></hr>

        <div className="form-horizontal">
          <div className="form-body">
            <div className="form-group row">
              <div className="col-md-6">
                <TextField
                  name="firstName" 
                  disabled
                  label={translate("FIRST_NAME")}
                  className={classes.textField}
                  defaultValue="Name"
                  value={user.firstName}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  name="email" 
                  disabled
                  label=  {translate("EMAIL")}
                  className={classes.textField}
                  defaultValue="Email"
                  value={user.email}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  name="userName" 
                  disabled
                  label=  {translate("USER_NAME")}
                  className={classes.textField}
                  defaultValue="User Name"
                  value={user.userName}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  name="phoneNumber" 
                  disabled
                  label=  {translate("PHONE_NO")}
                  className={classes.textField}
                  defaultValue="Phone"
                  value={user.phoneNumber}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  name="address" 
                  disabled
                  label=  {translate("ADDRESS")}
                  className={classes.textField}
                  defaultValue="Address"
                  value={user.address}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            {/* <div className="col-md-12 text-right">
              <Button variant="contained" color="primary" className={classes.button} onClick={()=>{this.props.history.push('/user/edit-profile')}}>
                  Edit Profile
              </Button>
            </div> */}
          </div>
        </div>
      </form>
</React.Fragment>     
    );
  }
}

export default connect(null, null)(withStyles(styles)(ChangePassword))