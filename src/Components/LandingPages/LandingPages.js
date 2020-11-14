import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getLoggedInUserAction } from './../../Redux/userDuck'

import LPSecretaria from './LPSecretaria/LPSecretaria';
import LPBioquimico from './LPBioquímico/LPBioquimico';


class LandingPages extends Component {

  componentDidMount() {
    this.props.getLoggedInUserAction();
  }
  
  getLandingPageByRole = (rol) => {
    if (rol==="ROLE_ADMIN") {
      return <div>soy un admin</div>;
    } else if (rol==="ROLE_SECRETARIA"){
      return <LPSecretaria />;
    } else if (rol==="ROLE_TECNICO_LABORATORIO"){
      return <div>soy un tecnico</div>;
    } else if (rol==="ROLE_BIOQUIMICO"){
      return <LPBioquimico />
    }

  }

  render() {
      const { fetchingLoggedInUser, userRole } = this.props;

      return (
        <div>
          {fetchingLoggedInUser ?                     
            <div className='spinner'>
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