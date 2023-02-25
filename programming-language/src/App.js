import TextInput from "./components/TextInput.js";
import RecommendLanguages from "./components/RecommendRanguages.js";
import SelectedLanguages from "./components/SelectedLanguages.js";
import { fetchRecommendLanguages } from "./api/fetch.js";

function App($app) {
  this.state = {
    searchLanguage: "", // 현재 검색 중인 언어 (추가 구현)
    fetchedLanguages: [], // api를 통해 가져온 언어들의 배열
    selectedLanguages: [], // enter, click등의 이벤트를 통해서 선택한 언어들의 배열
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    recommendLanguage.setState({
      suggestionIndex: 0,
      searchLanguage: this.state.searchLanguage,
      items: this.state.fetchedLanguages,
    });

    selectedLanguage.setState({
      items: this.state.selectedLanguages,
    });
  };

  const textInput = new TextInput({
    $app,
    initialState: "",
    onChange: async (keyword) => {
      this.setState({ searchLanguage: keyword });

      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchRecommendLanguages(keyword);
        this.setState({
          fetchedLanguages: languages,
        });
      }
    },
  });

  const recommendLanguage = new RecommendLanguages({
    $app,
    initialState: {
      selectedLanguages: this.state.selectedLanguages,
    },
    onSelect: (laguages) => {
      alert(laguages);

      const nextSelectedLaguages = [...this.state.selectedLanguages];

      const index = nextSelectedLaguages.findIndex(
        (selectedLanguages) => selectedLanguages === laguages
      );

      if (index > -1) {
        nextSelectedLaguages.splice(index, 1);
      } // 이미 배열에 존재하는 언어라면 추가하지 않음
      nextSelectedLaguages.push(laguages);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLaguages,
      });
    },
  });

  const selectedLanguage = new SelectedLanguages({ $app });
}

export default App;
