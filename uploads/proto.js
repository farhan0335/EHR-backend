const obj = {
    name : "farhan Raza",
    getname : function(){
        return this.name;
    },
    getroll : function(){
        return this.roll;
    }
     
}
console.log();

const obj2 = {
    roll: 1,
    __proto__: obj

}
const obj3 = {
    class : "hello ",
    __proto__: obj2
}
// console.log(obj2.getname());
// console.log(obj2.getroll());
// console.log(obj2); 
console.log(Object); 
console.log(Object.getPrototypeOf(obj3));  