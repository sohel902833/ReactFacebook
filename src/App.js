
import { BrowserRouter, Route } from 'react-router-dom';
import MainComponent from './MainComponent'
import Message from './Message/Message';
import Login from './User/Login'
import Register from './User/Register';
function App() {
  return (
    <BrowserRouter>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route exact path="/" component={MainComponent}/>
        <Route exact path="/message" component={Message}/>
        <Route exact path="/video" component={MainComponent}/>
        <Route exact path="/profile/:userId" component={MainComponent}/>
        <Route exact path="/friend" component={MainComponent}/>
    </BrowserRouter>
    
  );
}

export default App;
