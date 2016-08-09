module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	Checkout.aggregate(
       	{ $group: { _id: '$userId', users: {$sum: 1} } },
       	{ $sort: { users: -1 } },
       	function (err, res) {
           	if (err){ 
           		return handleError(err);
           	}
           	var i = 1;
           	var answer = "user" + res[0]._id.toString() + " had " + res[0].users.toString() + " Checkouts";
           	while (res[0] === res[i]) {
           		answer = "user" + res[i]._id.toString() + " and " + answer;
           		i = i + 1;
           	}
       		console.log(answer);
       }
   	);
};
