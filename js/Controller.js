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
      .on("@submit", (event) => this.serch(event.detail.value))
      .on("@reset", () => this.reset());
    this.tabView.on("@change", (event) => this.changeTab(event.detail.value));
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

  changeTab(tab) {
    console.log(tag, "changeTab", tab);
    this.store.selectedTab = tab;
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
