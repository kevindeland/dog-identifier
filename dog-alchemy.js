var AlchemyAPI = require('alchemy-api');
var MY_API_KEY = null
var alchemy = new AlchemyAPI(MY_API_KEY);


var imageUrls = [
    'http://cdn.abclocal.go.com/content/creativecontent/images/cms/406006_1280x720.jpg',
    'http://d21vu35cjx7sd4.cloudfront.net/dims3/MMAH/thumbnail/645x380/quality/90/?url=http%3A%2F%2Fs3.amazonaws.com%2Fassets.prod.vetstreet.com%2F98%2Fd98250a0d311e0a2380050568d634f%2Ffile%2FGolden-Retriever-3-645mk062411.jpg',
    'http://mybuzzblog.com/wp-content/uploads/2014/12/German-Shepherds.jpg',
    'http://dogbreedsinfo.org/images/German-Shepherd.jpg',
    'http://dogbreedsinfo.org/images/Golden-Retriever.jpg',
    'http://dogbreedsinfo.org/images/Cardigan_Welsh_Corgi.jpg',
    'http://dogbreedsinfo.org/images/labrador_retriever.jpg'
]

var breeds = {
    'golden retriever': [],
    'german shepherd': [],
    'pug': [],
    'daschund': []
}

/** 
 * process each image in array
 * checks if image matches a breed of dog
 */
function matchImagesToBreeds(imageUrls) {

    imageUrls.forEach(function(url) {
        alchemy.imageKeywords(url, {forceShowAll: 1}, function(err, response) { 

            if(err) {
                console.log(err);
                return;
            }
            
            // look for breeds in keywords
            response.imageKeywords.forEach(function(keyword) {

                var kwText = keyword.text

                if(breeds[kwText]) {
                    breeds[kwText].push(url);
                    console.log(url, 'might be a', kwText);
                }
            });
        });
    });
}
