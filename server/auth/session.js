function ensureAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
}

function alreadyAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) {
      return res.redirect('localhost:3000');
    }
    return next();
  
}

module.exports = {ensureAuthenticated, alreadyAuthenticated };