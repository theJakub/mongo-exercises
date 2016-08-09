module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	Checkout.aggregate(
       	{ $group: { _id: '$userId', checkouts: {$sum: 1} } },
       	{ $sort: { checkouts: -1 } },
       	function (err, res) {
           	if (err){ 
           		return handleError(err);
           	}
           	var i = 1;
           	var answer = "user" + res[0]._id.toString() + " had " + res[0].checkouts.toString() + " Checkouts";
           	while (res[0].checkouts === res[i].checkouts) {
           		answer = "user" + res[i]._id.toString() + " and " + answer;
           		i = i + 1;
           	}
       		console.log(answer);
       }
   	);
};
