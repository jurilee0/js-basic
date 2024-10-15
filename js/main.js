console.log('hello parcel')

async function testFunc(){
    const promise = Promise.resolve(123)
    console.log(await promise)
}

testFunc();