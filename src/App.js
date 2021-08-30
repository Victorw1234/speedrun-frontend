import "./App.css";
import Login from "./Login";
import { APIContext } from "./APIContext";
import { UserContext } from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Logout from "./Logout";
import Header from "./Header";
import GameList from "./GameList";
import Game from "./Game";
import Page404 from "./Page404";
import Signup from "./Signup";
import AddTime from "./AddTime";

function App() {
  const [username, setUsername] = useLocalStorage("username", null);
  let API = "http://localhost:52107";

  async function onStartup() {
    var isLoggedIn = false;
    var fetchedUsername;
    await fetch(API + "/Login", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        isLoggedIn = data.isLoggedIn;
        fetchedUsername = data.username;
      });

    if (isLoggedIn) {
      console.log("if ran now");
      setUsername(fetchedUsername);
    } else {
      setUsername(null);
    }
  }

  useEffect(() => {
    console.log(username);
  }, [username]);

  useEffect(() => {
    onStartup();
  }, []);

  return (
    <div className="App">
      <APIContext.Provider value={API}>
        <UserContext.Provider value={username}>
          <BrowserRouter>
            <Header updateUser={setUsername} />
            <div className="content-container">
              <Switch>
                <Route
                  exact
                  path="/Login"
                  render={() => {
                    return <Login updateUser={setUsername} />;
                  }}
                />
                <Route exact path="/Signup" component={Signup} />

                <Route exact path="/Games" component={GameList} />
                <Route exact path="/Game/:title" component={Game} />
                <Route
                  exact
                  path="/Game/:title/:categoryExtension"
                  component={Game}
                />
                {
                  // should only be able to add times if logged in
                  username != null ? (
                    <Route
                      exact
                      path="/Game/:title/:categoryExtension/addtime"
                      component={AddTime}
                    />
                  ) : (
                    <Redirect to="/Login" />
                  )
                }

                {/*<Route 
                  component={Page404}
                  />*/}
              </Switch>
            </div>
          </BrowserRouter>
        </UserContext.Provider>
      </APIContext.Provider>
    </div>
  );
}

export default App;
