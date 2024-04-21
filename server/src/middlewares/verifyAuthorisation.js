const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../services/user-service');

const verifyAuthorisation = (req, res, next) => {   
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        console.error(err);
        return res.status(401).send('Token invalide');
    }
    return next();
};

const verifyTokenBlacklist = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (await isTokenBlacklisted(token)) {
            return res.status(401).send('Token invalide');
        }
    }catch(err){
        console.error(err);
        return res.status(401).send('Token invalide');
    }
    next();
};

const verifyAdmin = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'admin'){
            return res.status(401).send('Non autorisé');
        }
        next();
    }catch(error) {
        console.error(error);
        return res.status(401).send('Non autorisé');
    
    }
};

const verifyIsUser = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'user'){
            return res.status(401).send('Non autorisé');
        }
        next();
    }catch(error) {
        console.error(error);
        return res.status(401).send('Non autorisé');
    
    }
};

module.exports = {
    verifyAuthorisation,
    verifyTokenBlacklist,
    verifyAdmin,
    verifyIsUser
}