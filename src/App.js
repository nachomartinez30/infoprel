import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bienvenida from './routhes/Bienvenida';
import Login from './routhes/Login';
import './styles.css'
import 'bootstrap'
import Footer from './singles/Footer';
import Generales from './routhes/Generales';
import WizardSteps from './singles/WizardSteps';
import ApoyosState from "./context/apoyos/apoyosState";
import Apoyos from './routhes/Apoyos';
import Firma from './routhes/Firma';


function App() {
  return (
    <ApoyosState>{/* STATE general para toda la solicitud de apoyos */}
      <div className='container'>
        <WizardSteps />
        <Router>
          <Switch>
            <Route exact path="/" component={Bienvenida} />
            <Route exact path="/generales" component={Generales} />
            <Route exact path="/apoyos" component={Apoyos} />
            <Route exact path="/firmar" component={Firma} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </ApoyosState>
  );
}

export default App;
