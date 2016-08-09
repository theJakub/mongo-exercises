module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?
	Movie.find(
		{title : {$regex : "Lord of the Rings:"}},
		function(err, data){
			if(err){
				return console.log("error");
			}
			var idArr = [];
			for (var i = 0; i < data.length; i++){
				idArr.push(data[i]._id);
			}
			Checkout.distinct( "userId",
              	{ movieId: { $in: idArr }},
              	function(err, userIds){
                   	if (err) {
                      	return console.log(err);
                  	}
                  	userIds.sort();
                  	console.log("These users: " +  userIds + ", checked out one of the Lord of the Rings Movies");
              	}
          	);
       	}
   	);
};
