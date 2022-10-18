import logo from './logo.svg';
import React from 'react';
import './App.css';
import { API_KEY } from './config'
const DELAY = 1000*60;

class App extends React.Component {
  // Application state
  state = { quote: 'Famous quotes on the way ...', author: 'Unknown author' };
  
  componentDidMount() {
    // serve new quotes automatically each minute
    this.interval = setInterval(this.fetchQuote, DELAY);

    // server one at start
    this.fetchQuote();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextQuote = () => {
    // reset auto
    clearInterval(this.interval);
    this.interval = setInterval(this.fetchQuote, DELAY);
    
    this.fetchQuote();
  }

  fetchQuote = async () => {    
    try {
      const resp = await fetch("https://quotes-q04p.api.codehooks.io/dev/quote", {
        method: "GET",
        headers: { "x-apikey": API_KEY }
      })
      const { quote, author } = await resp.json();
      this.setState({ quote, author });
    } catch (ex) {
      console.error(ex);
    }
  }

  render() {
    const { advice } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            React and Codehooks.io quotes
          </h2>
          <div className="card">
            <h4 className="heading">{this.state.quote}</h4>
            <p className="author">{this.state.author}</p>            
          </div>
          <p><a className="App-link" href="#" onClick={this.nextQuote}>Next quote 👉</a></p>
          <p><a className="Blog-link" href="https://codehooks.io/blog">Read blog post here</a></p>
        </header>        
      </div>
    );
  }
}

export default App;
