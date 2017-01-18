var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leaders');

// Connection URL
var url = 'mongodb://localhost:27017/restaurant';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected correctly to server");

    db.collection('dishes').drop(function() {
        db.collection('promotions').drop(function() {
            db.collection('leaders').drop(function() {
                Dishes.create({
                    "name": "Uthapizza",
                    "image": "images/uthapizza.png",
                    "category": "mains",
                    "label": "Hot",
                    "price": "4.99",
                    "description": "A unique . . .",
                    "comments": [{
                        "rating": 5,
                        "comment": "Imagine all the eatables, living in conFusion!",
                        "author": "John Lemon"
                    }, {
                        "rating": 4,
                        "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                        "author": "Paul McVites"
                    }]
                }, function(err, dish) {
                    if (err) {
                        console.log("Erreur:", err);
                    }
                    console.log('Dish created!');
                    console.log(dish);

                    Promotions.create({
                        "name": "Weekend Grand Buffet",
                        "image": "images/buffet.png",
                        "label": "New",
                        "price": "19.99",
                        "description": "Featuring . . ."
                    }, function(err, prom) {
                        if (err) {
                            console.log("Erreur:", err);
                        }
                        console.log('Promotion created');
                        console.log(prom);

                        Leaders.create({
                            "name": "Peter Pan",
                            "image": "images/alberto.png",
                            "designation": "Chief Epicurious Officer",
                            "abbr": "CEO",
                            "description": "Our CEO, Peter, . . ."
                        }, function(err, leader) {
                            if (err) {
                                console.log("Erreur:", err);
                            }
                            console.log('Leader created');
                            console.log(leader);

                            db.close();
                        });
                    });
                });
            });
        });
    });
});
