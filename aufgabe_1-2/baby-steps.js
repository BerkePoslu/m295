function sum() {
    let total = 0;
    for (let i = 2; i < process.argv.length; i++) {
        total += parseFloat(process.argv[i]); 
    }
    return total;
}

console.log(sum()); 