

describe('Cadastrar entregador',()=>{
    it('Usuario deve se tornar um entregador',()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')

       // Massa de teste
        var entregador = {

            nome: 'joão da silva',
            cpf: '00000012312',
            email: 'joaodasilva@gmail.com',
            wpp: '11999999999',
            metodo_entrega: 'Moto',
            cnh:'cnh_digital.jpg'
        }
        var endereco = {
            
            cep:'06463240',
            rua:'Rua Juventus',
            numero: '234',
            complemento: 'Casa 2',
            bairro: 'Jardim Mutinga',
            cidade_uf: 'Barueri/SP'
            
        }

        // Preenche dados do entregador
        cy.get('input[name=name]').type(entregador.nome)
        cy.get('input[name=cpf]').type(entregador.cpf)
        cy.get('input[name=email]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.wpp)

        // Preenche e busca cep
        cy.get('input[name=postalcode]').type(endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(endereco.numero)
        cy.get('input[name="address-details"]').type(endereco.complemento)

        //Validação
        cy.get('input[name="address"]').should('have.value', endereco.rua)
        cy.get('input[name="district"]').should('have.value', endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', endereco.cidade_uf)

        // Categoria - Método de entrega 
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        //
        // Importa CNH
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)

        // Finalizar e Validar Cadastro
        cy.get('button[class="button-success"]').click()
        cy.get('#swal2-title').should('have.text','Aí Sim...')
        
    })


})