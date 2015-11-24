// app/models/cliente.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    cpf: String,
    nome: String,
    email: String,
    estadocivil: String,
    telefones:[{		
		numero: String
	}],
    logradouro: String,
    numero: Number,
    bairro: String,
    cidade: String,
    estado: String
});

module.exports = mongoose.model('clientes', ClienteSchema);