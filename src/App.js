import "./App.css";
import "tailwindcss/dist/tailwind.css";
import React from "react";
import { AppNav, AppHome, AppSignUp, AppRecipes, AppLogIn, AppNutrition, AppCocktail } from "./components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import PrivateRoute from "./components/PrivateRoute";
import Owner from "./components/Owner";


function App() {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path={"/"} component={AppHome} />
        <Route path={"/signup"} component={AppSignUp} />
        <Route path={"/login"} component={AppLogIn} />
        <Route path={"/products"} component={ProductsPage} />
        <Route path={"/owner"} component={Owner} />
        {/* <Route path={'/nutrition'} component={AppNutrition}/> */}
        {/* <Route path={'/cocktails'} component={AppCocktail}/> */}
      </Switch>
    </Router>
  );
}

export default App;
