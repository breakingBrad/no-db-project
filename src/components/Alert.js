import React from 'react';
import './Alert.css';

const Alert = (props) => (

<div className="alert">
  <span className="closebtn" onClick={props.closeAlertModal}>&times;</span> 
  <b>Pokémon Party is Full:</b> You must remove a pokémon before adding another.
</div>

  );
export default Alert;