
import Search from './components/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './components/Home'
import PostDetail from './components/PostDetail'
function App() {
  return (
    <div className="App">

       <Search/>
       <Router>
     
        

        <Switch>
          <Route path="/:id" component={PostDetail} />
          <Route path="/" component={Home}  />

        </Switch>
   </Router>
      {/* <Home/> */}
      
    </div>
  );
}

export default App;
