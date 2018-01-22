require('es6-promise').polyfill();
require('isomorphic-fetch');

    /*fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });*/
    /*fetch('http://localhost:8000/').then(function(res){
      return res.json()
    }).then(function(json) {
        console.log(json);
    });*/