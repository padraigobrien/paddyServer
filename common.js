var env = require('./environment.json');

exports.config = function() {
    var node_env = process.env.NODE_ENV || 'development';
    return env[node_env];
};
