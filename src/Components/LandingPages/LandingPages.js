import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getLoggedInUserAction } from './../../Redux/userDuck'

import LPSecretaria from './LPSecretaria/LPSecretaria';
import LPBioquimico from './LPBioquímico/LPBioquimico';
import LPAdmin from './LPAdmin/LPAdmin';


class LandingPages extends Component {

  componentDidMount() {
    this.props.getLoggedInUserAction();
  }
  
  getLandingPageByRole = (rol) => {
    if (rol==="ROLE_ADMIN") {
      return <LPAdmin />;
    } else if (rol==="ROLE_SECRETARIA"){
      return <LPSecretaria />;
    } else if (rol==="ROLE_TECNICO_LABORATORIO"){
      return <LPBioquimico />;
    } else if (rol==="ROLE_BIOQUIMICO"){
      return <LPBioquimico />;
    }

  }

  render() {
      const { fetchingLoggedInUser, userRole } = this.props;

      return (
        <div>
          {fetchingLoggedInUser ?                     
            <div style={{position:'fixed',top:'50%',left:'50%'}}>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
            </div> 
             : this.getLandingPageByRole(userRole) 
          }
        </div>
      )
  }
}


function mapStateToProps(state){
  return {
    userRole: state.user.loggedInUser.rol,
    fetchingLoggedInUser: state.user.fetchingLoggedInUser,
  }
}

export default withRouter(connect(mapStateToProps, { getLoggedInUserAction })(LandingPages));