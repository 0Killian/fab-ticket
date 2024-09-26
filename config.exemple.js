module.exports = {
  // JWT token secret. Warning: if this key is leaked, users will be able to forge JWT tokens and authenticate as any user.
  secret: 'thisisasecret',

  // Port number the HTTP(S) server will be listening on. 
  port: 5000,

  // Hostname or IP address the HTTP(S) server will be accessible from.
  host: 'localhost',

  // Database configuration
  dbConfig: {
    // User used to connect to the database
    user: 'fabticket',

    // Password used to connect to the database
    password: 'fabticket2024',

    // Host of the database
    host: 'localhost',

    // Port of the database
    port: 3306,

    // Name of the database to connect to
    database: 'fabticket',

    // Type of database
    dialect: 'mysql',
  },

  // LDAP configuration (authentication & authorization)
  ldap: {
    // Options to connect to the LDAP server (see https://www.npmjs.com/package/ldap-authentication, ldapOpts field)
    opts: { url: 'ldap://localhost:389' },

    // LDAP query to get the user. You can use #[[username]] to fill in the username passed in the login form
    userDnQuery: 'cn=#[[username]],dc=mydil-nantes,dc=fr',

    // Where to search for groups
    groupsSearchBase: 'ou=groups,dc=mydil-nantes,dc=fr',

    // Attribute used to get the groups on the user
    groupClass: 'groupOfUniqueNames',

    // Attribute used to get the group members
    groupMemberAttribute: 'uniqueMember',

    // Admin group
    adminGroup: 'admin',

    // Admin DN
    adminDn: 'cn=admin,dc=mydil-nantes,dc=fr',

    // Admin password
    adminPassword: 'root',
  },

  // Optional: HTTPS config
  // https: {
  //   // The path to the key file
  //   key: './server.key',
  //
  //   // The path to the certificate file
  //   cert: './server.crt'
  // },
};

