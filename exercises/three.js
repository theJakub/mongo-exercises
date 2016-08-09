module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?
	Checkout.aggregate(
       { $group: { _id: '$movieId', count: {$sum: 1} } },
       { $sort: { count: -1 } },
       function (err, res) {
           	if (err) {
            	return console.log("error");
        	}
            Movie.findOne({
                _id : res[0]._id
            }, function(err, data){
                if (err){
                	return console.log("error");
                }
                console.log(data.title + " had "+ res[0].count.toString() + " checkouts");
            });
       }
   );
};
