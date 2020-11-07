import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getLoggedInUserAction } from './../../Redux/userDuck'

import LPSecretaria from './LPSecretaria/LPSecretaria';


class LandingPages extends Component {

  componentDidMount() {
    this.props.getLoggedInUserAction();
  }
  

  getLandingPageByRole = () => {
    const rol = JSON.parse(localStorage.getItem("rol"))
    switch(rol){
      case "ROLE_ADMIN":
        return <LPSecretaria />;
      case "ROLE_SECRETARIA":
        return <LPSecretaria />;
      case "ROLE_TECNICO_LABORATORIO":
        return <div>hola soy tecnico en lab</div>;
      case "ROLE_BIOQUIMICO":
        return <div>hola soy bioquimico</div>;

      default:
        return <div>hola soy la opcion por default mucho gusto!</div>;
    }
  }

  getLandingPageByRole = (rol) => {
    if (rol==="ROLE_ADMIN") {
      return <div>soy un admin</div>;
    } else if (rol==="ROLE_SECRETARIA"){
      return <LPSecretaria />;
    } else if (rol==="ROLE_TECNICO_LABORATORIO"){
      return <div>soy un tecnico</div>;
    } else if (rol==="ROLE_BIOQUIMICO"){
      return <div>soy un bioquimico</div>
    }

    // switch(rol){
    //   case "ROLE_ADMIN":
    //     return <LPSecretaria />;
    //   case "ROLE_SECRETARIA":
    //     return <LPSecretaria />;
    //   case "ROLE_TECNICO_LABORATORIO":
    //     return <div>hola soy tecnico en lab</div>;
    //   case "ROLE_BIOQUIMICO":
    //     return <div>hola soy bioquimico</div>;

    //   default:
    //     return <div>hola soy la opcion por default mucho gusto!</div>;
    // }
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