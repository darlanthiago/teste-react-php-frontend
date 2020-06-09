import React from "react";
import { Switch, Route } from "react-router-dom";

import Atividades from "./pages/Atividades";
import AtividadesView from "./pages/Atividades/view";
import AtividadesCreate from "./pages/Atividades/create";
import AtividadesEdit from "./pages/Atividades/edit";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Atividades} />
      <Route path="/activityView/:id" component={AtividadesView} />
      <Route path="/activityCreate" component={AtividadesCreate} />
      <Route path="/activityEdit/:id" component={AtividadesEdit} />
    </Switch>
  );
}

export default Routes;
