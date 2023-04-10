'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: {
        type: String
      },
    name: {
        type: String,
        required: [true, 'O Nome É Necessário'],
        unique: false
    },
    email: {
        type: String,
        required: [true, 'O E-mail É Necessário'],
        unique: false
    },
    password: {
        type: String,
        required: [true, 'A Senha É Necessário'],
        unique: false
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    createDate: {
        type: Date,
        required: [true, 'A Data É Necessário'],
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', schema);