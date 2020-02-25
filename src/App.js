import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bienvenida from './rutas/Bienvenida';
import Login from './rutas/Login';
import './styles.css'
import 'bootstrap'
import Footer from './componentes/Footer';
import Generales from './rutas/Generales';
import WizardSteps from './componentes/WizardSteps';
import ApoyosState from "./context/apoyos/apoyosState";


function App() {
  return (
    <ApoyosState>{/* STATE general para toda la solicitud de apoyos */}
      <div className='container'>
        <WizardSteps />
        <Router>
          <Switch>
            <Route exact path="/" component={Bienvenida} />
            <Route exact path="/generales" component={Generales} />
            {/* <Route exact path="/proyectos" component={Proyectos} /> */}
          </Switch>
          <Footer />
        </Router>
      </div>
    </ApoyosState>
  );
}

export default App;
