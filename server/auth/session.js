function ensureAuthenticated(req, res, next) 
{

    if (req.isAuthenticated()) {
      next();
    }
    else {
      return res.status(401).json({message: "Not Authorized", redirect: "localhost:3000"})
    }
}

function alreadyAuthenticatedLoginRegister(req, res, next) 
{
    if (req.isAuthenticated()) {
      return res.status(302).json({message: "Already logged in", redirect: "localhost:3000"})
    }
    else {
      next();
    }
}

module.exports = { ensureAuthenticated, alreadyAuthenticatedLoginRegister };