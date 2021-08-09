import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Escrows from "./Pages/Escrows";
import Partner from "./Pages/Partner";
import Track from "./Pages/Track";
import UserProfile from "./Pages/UserProfile";
import Wallet from "./Pages/Wallet";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Escrows} />
          <Route path="/escrows" exact component={Escrows} />

          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/wallet" exact component={Wallet} />
          <Route path="/userprofile" exact component={UserProfile} />
          <Route path="/track" exact component={Track} />
          <Route path="/partner" exact component={Partner} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
