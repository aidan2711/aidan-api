let username = "aidan";
let password = "P@ssword";
let collection = "aidan_todo";
let clutter = "cluster0.yg7iv";

exports.mongoURI = `mongodb+srv://${username}:${password}@${clutter}.mongodb.net/${collection}?retryWrites=true&w=majority`;
