function ensureAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) {
      next();
    }
    else {
      return res.redirect('/');
    }
}

function alreadyAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    else {
      next();
    }
  
}

module.exports = { ensureAuthenticated, alreadyAuthenticated };