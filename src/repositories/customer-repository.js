"use strict";

const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

exports.get = async () => {
  const res = await Customer.find({}, "name email");
  return res;
};

exports.getById = async (id) => {
  const res = await Customer.findById(id);
  return res;
};

exports.getUidByEmail = async (email) => {
  const user = await Customer.findOne({ email: email });
  if (user) {
    return user.uid;
  } else {
    return null;
  }
};

exports.getByEmailExist = async (email) => {
  const user = await Customer.findOne({ email });
  return user;
};

exports.create = async (data) => {
  var customer = await new Customer(data);
  await customer.save();
};

exports.authenticate = async (data) => {
  const res = await Customer.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.update = async (id, data) => {
  await Customer.findByIdAndUpdate(id, {
    $set: {
      name: data.name,
      email: data.email,
      password: data.password
    },
  });
};

exports.delete = async (id) => {
  await Customer.findByIdAndRemove(id);
};
