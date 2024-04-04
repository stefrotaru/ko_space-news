import './custom_bindings/customBindings.js';

function newsArticle(data) {
    this.id = data.id;
    this.title = data.title;
    this.url = data.url;
    this.imageUrl = data.image_url;
    this.summary = data.summary;
    this.newsSite = data.news_site;
    this.publishedAt = data.published_at;
    this.updatedAt = data.updated_at;
}

function AppViewModel() {
    // Data
    const self = this;
    self.isLoading = ko.observable(true);
    self.loadedNews = ko.observableArray([]);
    self.newsLimit = ko.observable(12);
    self.newsOffset = ko.observable(0);

    self.showMenu = ko.observable(false);

    // Operations
    self.fetchNews = function () {
        fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${self.newsLimit()}&offset=${self.newsOffset()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let mappedData = data.results.map(function (article) {
                    return new newsArticle(article);
                });
                self.loadedNews(mappedData);
                self.isLoading(false);
                console.log(self.isLoading())
            });
    };

    self.fetchNextPageNews = function () {
        self.isLoading(true);
        // set new offset
        self.newsOffset(self.newsOffset() + self.newsLimit());

        self.fetchNews();
    };

    self.fetchPreviousPageNews = function () {
        self.isLoading(true);
        // set new offset
        self.newsOffset(self.newsOffset() - self.newsLimit());
        
        self.fetchNews();
    };

    self.toggleMenu = function () {
        self.showMenu(!self.showMenu());
    };

    // Load initial state from server
    self.fetchNews();
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());