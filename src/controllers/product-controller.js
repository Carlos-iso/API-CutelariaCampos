'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Precessar Requisição'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Precessar Requisição'
        });
    }

}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Precessar Requisição'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Precessar Requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O Título Deve Conter Pelo Manos 3 Caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug Deve Conter Pelo Manos 3 Caracteres');
    contract.hasMinLen(req.body.description, 3, 'A Descrição Deve Conter Pelo Manos 3 Caracteres');

    //Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Produto Cadastrado Com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Cadastrar Item!'
        });
    }
}

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto Alterado Com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Alterar!'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto Removido Com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha Ao Remover!'
        });
    };
}