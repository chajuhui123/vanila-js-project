import Input from "./components/Input.js";

function App($app) {
  this.state = {
    fetchedLanguages: [],
  };

  const searchInput = new Input({
    $app,
    initialState: this.state.fetchedLanguages,
    onChange: async (value) => {
      if (value.length > 0) {
        // const result = await fetchLanguages(value);
        // this.setState({fetchedLanguages:result});
      } else {
        // this.setState({fetchedLanguages:[]});
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    searchInput.setState(this.state.fetchedLanguages);
  };

  this.init();
}

export default App;
