const {connect} = require('mongoose');
require('dotenv').config()


module.exports = {
     connect : connect(process.env.MONGODB_URI)
}