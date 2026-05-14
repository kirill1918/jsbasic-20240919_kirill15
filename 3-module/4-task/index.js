let user1 = {
  "balance": "$1,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 21,
  "name": "Golden Branch",
  "gender": "male",
  "greeting": "Hello, Golden Branch! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

let users = [user1]


function showSalary(users, age) {
  for(let i = 0;  i < users.length; i++) { 
    let user = users[i]
    if(users.age <= age) { 
       return `${user1.name} , ${user1.age}\n `
    }

  }

  }

let age = 50
let result = showSalary(users, age);
console.log(result)