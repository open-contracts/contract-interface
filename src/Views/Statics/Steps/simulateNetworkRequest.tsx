export const simulateNetworkRequest =  async <T extends any>(value : T, upperBound : number = 5000) : Promise<T> =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(value);
        }, Math.random() * upperBound)
    })
}