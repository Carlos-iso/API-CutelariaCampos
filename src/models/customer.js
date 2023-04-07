'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'O Nome É Necessário'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'O E-mail É Necessário'],
        trim: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'A Senha É Necessário'],
        trim: true,
        unique: true
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