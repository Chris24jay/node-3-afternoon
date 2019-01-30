//checks to see if a session has been created
module.exports = function(req,res,next) {
    // console.log(req.session) 
    const {session} = req
    if(!session.user){
        session.user = {
            username: '',
            cart: [],
            total: 0
        }
        // stored in app.session or req.session
    }
    next()
}