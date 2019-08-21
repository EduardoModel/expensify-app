const add = (a,b) => a+b

test('essa função deverá somar 2 números', () =>{
    const result = add(3,4)

    if(result !== 7){
        throw new Error(`Você somou 3 e 4. O resultado foi ${result}. É experado 7.`)
    }
})