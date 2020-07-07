const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
	try{
		let token =req.headers.token
		token = token.split(" ")[1]
		decode = jwt.verify(token,'secret')
		req.userData = decode;
		next()
	}catch(err){
		res.json({
			error:"Invalid token",
			message:"Email or password Invalid"
		})
	}
}