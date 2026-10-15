const {getAuth} = require("@clerk/express");
const requireAuthentication = (req, res, next) => {
    const {isAuthenticated} = getAuth(req);
    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    next();
}

module.exports = requireAuthentication;