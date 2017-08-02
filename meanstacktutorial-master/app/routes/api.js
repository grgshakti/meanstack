//http://localhost:8080/api/users

var User = require('../models/user');
module.exports = function(router){
    router.post('/users', function(req, res){
    var user= new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == ''){
        res.json({ success: false, message: 'Ensure username, email and password are provided'});

    } else {
    user.save(function(err){
        if (err) {
            res.json({success: false, message: 'Username or email already exist'});
        } else {
            res.json({success: true, message: 'user created'});
        }
    });
}   
});  

///USER LOGIN ROUTE
    //http://localhost:port/api/authenticate
    router.post('/authenticate', function(req,res){
       User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {

            if (err) throw err;
            if (!user){
                res.json({success: false, message: 'Could not authenticate user'});
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword){
                    res.json({success: false, message: 'Could not authenticate password'});
                } else {
                    res.json({success: true, message: 'User authenticated!'});
                }
            }

        });
    });
return router;  
};
