function ensureAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) {
      next();
    }
    else {
      return res.redirect('http://localhost:3000/home');
    }
}

function alreadyAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) {
      return res.redirect('http://localhost:3000/home');
    }
    else {
      next();
    }
  
}

module.exports = { ensureAuthenticated, alreadyAuthenticated };