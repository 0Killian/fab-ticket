const ldap = require('ldap-authentication');
const jwt = require('jsonwebtoken');

/**
 * Middleware to check if a user is authenticated
 *
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */
function isAuthenticated(req, res, next) {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.redirect('/login');
        }

        let decoded = jwt.verify(token, req.app.get('config').secret);

        if (!decoded) {
            return res.redirect('/login');
        }

        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

/**
 * Middleware to ensure that the user is not authenticated
 *
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */
function isNotAuthenticated(req, res, next) {
    console.log(req.cookies);

    try {
        let token = req.cookies.token;

        if (!token) {
            next();
        }

        let decoded = jwt.verify(token, req.app.get('config').secret);

        if (!decoded) {
            next();
        }
        
        if (req.path.startsWith('/api')) {
            res.status(401).end();
        }

        console.log('redirecting ' + decoded.cn);

        if (decoded.groups.includes(req.app.get('config').ldap.adminGroup)) {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/tickets');
        }
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

/**
 * Middleware to check if a user is admin
 *
 * @param req {object}
 * @param res {object}
 * @param next {function}
 */
function isAdmin(req, res, next) {
    const config = req.app.get('config');
    if (req.user.groups.includes(config.ldap.adminGroup)) {
        next();
    } else {
        res.status(403).end();
    }
}

/**
 * Authenticate through LDAP
 *
 * @param config {object}
 * @param username {string}
 * @param password {string}
 * 
 * @returns {user|null}
 */
async function authenticate(config, username, password) {
    const userDn = config.ldap.userDnQuery.replace("#[[username]]", username);

    if (!validate(username)) {
        return null;
    }

    try {
        let user = await ldap.authenticate({
            ldapOpts: config.ldap.opts,
            userDn: userDn,
            userPassword: password,
            groupsSearchBase: config.ldap.groupsSearchBase,
            groupClass: config.ldap.groupClass,
            groupMemberAttribute: config.ldap.groupMemberAttribute,
            usernameAttribute: config.ldap.usernameAttribute,
            userSearchBase: config.ldap.usersSearchBase,
            username
        });

        if (!user) {
            return null;
        }

        user.groups = user.groups.map(group => group.objectName.split(',')[0].split('=')[1]);

        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * Retrieves user data
 * 
 * @param config {object}
 * @param username {string}
 * 
 * @returns {user|null}
 */
async function getUser(config, username) {
    const userDn = config.ldap.userDnQuery.replace("#[[username]]", username);

    try {
        let user = await ldap.authenticate({
            ldapOpts: config.ldap.opts,
            adminDn: config.ldap.adminDn,
            adminPassword: config.ldap.adminPassword,
            userDn: userDn,
            verifyUserExists: true,
            groupsSearchBase: config.ldap.groupsSearchBase,
            groupClass: config.ldap.groupClass,
            groupMemberAttribute: config.ldap.groupMemberAttribute,
            usernameAttribute: config.ldap.usernameAttribute,
            userSearchBase: config.ldap.usersSearchBase,
            username
        });

        if (!user) {
            return null;
        }

        user.groups = user.groups.map(group => group.objectName.split(',')[0].split('=')[1]);

        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * Create a JWT Token for the provided user
 *
 * @param user {object}
 * 
 * @returns {string}
 */
function createToken(config, user) {
    return jwt.sign(user, config.secret);
}

/**
  * Validate username
  *
  * @param username {string}
  * 
  * @returns {boolean}
  */
function validate(username) {
    // Only alpha numeric
    return /^[a-z0-9]+$/i.test(username);
}

module.exports = {
    isAdmin,
    isNotAuthenticated,
    isAuthenticated,
    authenticate,
    createToken,
    getUser
};
