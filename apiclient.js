// apiclient.js


// CONFIGURAÇÃO
// ===============================================

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/comercio';
mongoose.connect(url);

var Cliente = require('./app/models/cliente');
var VerificadorCpf = require('./verificadorCpf');
var VerificadorEmail = require('./validarEmail');
var VerificadorDados = require('./validarDadosEntradaCliente');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// ROTAS
// ===============================================

var router = express.Router(); 

// middleware
router.use(function(req, res, next) {    
    console.log("log de requisicao");
    next();
});

router.route('/clientes')
.post(function(req, res) {
	if(VerificadorDados(req.body.cpf, req.body.nome, req.body.email, req.body.estadocivil, req.body.telefones, req.body.logradouro, req.body.numero, req.body.bairro, req.body.cidade, req.body.estado)) {
		var cpfNovo = req.body.cpf.replace(/\./g, '').replace(/\-/g, '')	
		if(VerificadorCpf(cpfNovo)) {
			if(VerificadorEmail(req.body.email)){
				Cliente.find({ cpf :  cpfNovo }, function(err, cliente){
					if(err) {
			    		res.json({ erro: true, mensagem: err.message, lista : null });	
			    	}    	
			    	if(cliente.length == 0) {
			    		var c = new Cliente();
						c.cpf = cpfNovo;
					    c.nome = req.body.nome;
					    c.email = req.body.email;
					    c.estadocivil = req.body.estadocivil;
					    c.telefones = req.body.telefones;
					    c.logradouro = req.body.logradouro;
					    c.numero = req.body.numero;
					    c.bairro = req.body.bairro;
					    c.cidade = req.body.cidade;
					    c.estado = req.body.estado;
					    c.save(function(err){
					    	if(err){
					    		res.json({ erro: true, mensagem: err.message, lista : null });	
					    	}
					    	res.json({ erro: false, mensagem: 'Cliente adicionado com sucesso!', lista : null });
					    });
			    	}
			    	else{
			    		res.json({ erro: true, mensagem: "CPF já cadastrado", lista : null });		
			    	}
				});
			}
			else {
				res.json({ erro: true, mensagem: "Email inválido", lista : null });	
			}
		}
		else{
			res.json({ erro: true, mensagem: "CPF inválido", lista : null });	
		}			
	}
	else{
		res.json({ erro: true, mensagem: "Preencha todos os campos", lista : null });		
	}
})
.get(function(req, res){
	Cliente.find(function(err, clientes){
		if(err){
			res.json({ erro: true, mensagem: err.message, lista : null });	
		}		
		res.json({ erro: false, mensagem: '', lista : clientes });
	});
});

router.route('/clientes/:cpf')
.get(function(req, res){
	var cpfGet = req.params.cpf.replace(/\./g, '').replace(/\-/g, '') + "";
	Cliente.find({ cpf : cpfGet }, function(err, cliente){
		if(err){
			res.json({ erro: true, mensagem: err.message, lista : null });	
		}		
		res.json({ erro: false, mensagem: '', lista: cliente });
	});
})
.put(function(req, res) { 		
	if(VerificadorDados(req.body.cpf, req.body.nome, req.body.email, req.body.estadocivil, req.body.telefones, req.body.logradouro, req.body.numero, req.body.bairro, req.body.cidade, req.body.estado)) {
		var cpfCliente = req.params.cpf.replace(/\./g, '').replace(/\-/g, '');	
		var cpfNovo = req.body.cpf.replace(/\./g, '').replace(/\-/g, '');	
		if(VerificadorCpf(cpfNovo)) {
			if(VerificadorEmail(req.body.email)){
				Cliente.update({ cpf : cpfCliente }, 
				{ 
					cpf : cpfNovo,
					nome : req.body.nome,
					email : req.body.email,
				    estadocivil : req.body.estadocivil,
				    telefones : req.body.telefones,
				    logradouro : req.body.logradouro,		    
				    numero : req.body.numero,
				    bairro : req.body.bairro,
				    cidade : req.body.cidade,
				    estado : req.body.estado
				}, 
				function(err){
					if(err){	
						res.json({ erro: true, mensagem: err.message, lista : null });	
					}
					res.json({ erro: false, mensagem: 'Cliente alterado com sucesso!', lista : null });
				});	
			}
			else {
				res.json({ erro: true, mensagem: "Novo email inválido", lista : null });	
			}
		}
		else{
			res.json({ erro: true, mensagem: "Novo CPF inválido", lista : null });	
		}	
	}
	else{
		res.json({ erro: true, mensagem: "Preencha todos os campos", lista : null });
	}
})
.delete(function(req, res) {
	var cpfDelete = req.params.cpf.replace(/\./g, '').replace(/\-/g, '');
	Cliente.remove({ cpf: cpfDelete}, function(err, cliente){
		if(err){
			res.json({ erro: true, mensagem: err.message, lista : null });	
		}
		res.json({ erro: false, mensagem: "Cliente deletado com sucesso.", lista : null });
	});
});


app.use('/api', router);


// start servidor
// ===============================================

app.listen(port);
console.log('API executando na porta ' + port);