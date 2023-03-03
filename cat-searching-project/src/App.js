console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.setState({
          loading: false,
          data: null,
        });

        api.fetchCats(keyword).then(({ data }) =>
          this.setState({
            loading: true,
            data: data,
          })
        );
      },
      onClick: () => {
        this.setState({
          loading: false,
          data: null,
        });

        api.fetchRandomCat().then(({ data }) =>
          this.setState({
            loading: true,
            data: data,
          })
        );
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        api.fetchCatDetail(image.id).then(({ data }) =>
          this.imageInfo.setState({
            visible: true,
            image: data,
          })
        );
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
