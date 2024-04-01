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
    this.loadedNews = ko.observableArray([]);
    this.newsLimit = ko.observable(12);
    this.newsOffset = ko.observable(0);

    // Load initial state from server
    this.fetchNews = function () {
        fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${this.newsLimit()}&offset=${this.newsOffset()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let mappedData = data.results.map(function (article) {
                    return new newsArticle(article);
                });
                this.loadedNews(mappedData);
            });
    };
    this.fetchNews();

    // Operations
    this.fetchNextPageNews = function () {
        // set new offset
        this.newsOffset(this.newsOffset() + this.newsLimit());
        
        this.fetchNews();
    };

    this.fetchPreviousPageNews = function () {
        // set new offset
        this.newsOffset(this.newsOffset() - this.newsLimit());
        
        this.fetchNews();
    };
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());