const screenRatio = () =>{
	var ret = {};
	// var auxProportionH = 1.8;
	// var auxProportionW = 1.5;
	// if($(".container").width() * 2 < $(".container").height() * conf){
	// 	ret.bWidth = $(".container").width() * 2 * 0.5 * auxProportionH;
	// 	ret.bHeight = $(".container").width() * 2 * 0.55 *  auxProportionH;
	// 	ret.rWidth = $(".container").width() * 2 * 0.25 * auxProportionH;
	// 	ret.rHeight = $(".container").width() * 2 * 0.5 * auxProportionH;
	// 	console.log("001");
	// }
	// else{
	// 	ret.bWidth = $(".container").height() * conf * 0.5 * auxProportionW;
	// 	ret.bHeight = $(".container").height() * conf * 0.52 * auxProportionW;
	// 	ret.rWidth = $(".container").height() * conf * 0.25 * auxProportionW;
	// 	ret.rHeight = $(".container").height()  * conf * 0.5 *  auxProportionW;
	// 	console.log("002");
	// }
		ret.rWidth = $(".container").height();
		ret.rHeight = $(".container").height();
	return ret;
}