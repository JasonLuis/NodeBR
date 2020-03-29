//npm init -y -> inicia um novo projeto node

//Objetivo da aula:
// Obter um usuario
// Obter o telefone de um usuario pelo seu Id
// Obter o endereço do usuario pelo Id

//importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
  // quande der algum problema -> reject(ERRO)
  // quando sucess -> Resolv
  return new Promise(function resolverPromise(resolve, reject){  
    setTimeout(function(){
        //return reject(new Error('DEU RUIM DE VERDADE!'))
          return resolve({
            id: 1,
            nome: 'Felipe Smith',
            dataNasc: new Date()
          })
    }, 1000)
  })
}


function obterTelefone(idUsario){
    return new Promise(function resolverPromise(resolve, reject){
      setTimeout(()=> {
        return resolve({
          telefone: '3333-5555',
          ddd: '11'
        })
      },2000)
    })
}

function obterEndereco(idUsario,callback){
    setTimeout(()=>{
      return callback(null,{
        rua: 'Rua Alcantara de Jasmin',
        numero: 80
      })
    })
}
main()
async function main(){
    try{
      console.time('medida-promise')
      const usuario = await obterUsuario()
      //const telefone = await obterTelefone(usuario.id)
      //const endereco = await obterEnderecoAsync(usuario.id)
      const resultado = await Promise.all([
        obterTelefone(usuario.id),
        obterEnderecoAsync(usuario.id)
      ])
      const telefone = resultado[0];
      const endereco = resultado[1];
      console.log(`
          Nome: ${usuario.nome},
          Telefone: (${telefone.ddd}) ${telefone.telefone},
          Endereco: ${endereco.rua}, ${endereco.numero}
      `)
      console.timeEnd('medida-promise')
    }catch(error){
      console.log("DEU RUIM",error)
    }
}

//const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a função .then
// para manupular eeros, usamos o .catch
// usuario -> telefone -> telefone 
/*usuarioPromise
      .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
          return {
            usuario: {
              nome: usuario.nome,
              id: usuario.id
            },
            telefone: result
          }
        })
      })
      .then(function(resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario)
        return endereco.then(function resolverEndereco(result){
          return{
            usuario: resultado.usuario,
            telefone: resultado.telefone,
            endereco: result
          }
        })
      })
      .then(function (resultado){
        console.log(`
          Nome: ${resultado.usuario.nome},
          Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
          Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
      })
      .catch(function(error){
        console.error('DEU RUIM',error)
      })*/

/*obterUsuario(function resolverUsuario(error, usuario){
    if(error){
      console.error('DEU RUIM em USUARIO', error)
      return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
          console.error('DEU RUIM em TELEFONE',error1)
          return;
        }
        obterEndereco(usuario.id,function resolverEndereco(error2, endereco){
          if(error2){
            console.error('DEU RUIM em ENDERECO',error2)
            return;
          }
          console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua},${endereco.numero}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
          `)
        })    
    })
});*/
//const telefone = obterTelefone(usuario.id);

//console.log('usuario',usuario);
//console.log('telefone', telefone);