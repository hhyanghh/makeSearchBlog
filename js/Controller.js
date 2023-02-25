const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView }) {
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents();
    this.render();
  }
  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
  }

  search(keyword) {
    this.store.search(keyword);
    this.render();
  }

  reset() {
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      console.log(this.store.searchKeyword.length, "검색결과가 있음");
      this.tabView.hide();
      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.tabView.show();
    console.log(this.store.searchKeyword.length, "검색결과 없음, 리셋했음");
    this.searchResultView.hide();
  }
}
