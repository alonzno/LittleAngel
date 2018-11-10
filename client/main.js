import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/*import user collection*/
import "../modules/survey.js";

import './main.html';


Router.route('/', function () {
    this.render('register');
    document.title = "Welcome to Little Angle";
  });

/*create table for surveys*/
function tim_tom(){
    
    

    var i = 9;
    while(i > 0){
    var tablename = document.createElement("TableName");
    tablename.setAttribute("id", "myTable");
    document.body.appendChild(tablename);

    var y = document.createElement("TR");
    y.setAttribute("id", "tablerow");
    document.getElementById("myTable").appendChild(y);

    var z = document.createElement("TD");
    var t = document.createTextNode("Swag");
    var g = document.createElement("INPUT");
    z.appendChild(t);
    z.appendChild(g);
    document.getElementById("tablerow").appendChild(z);
    i--;
}

}

Router.route('/survey', function() {
    this.render('survey');
    document.title="Survey to get to know you";
    fetch('http://18.222.149.151:5984/surveys/_all_docs')
    .then(response => response.json())
    .then(json => console.log(json))
    tim_tom();

});



Router.route('/modules', function(){
    document.title="Pick available modules";
    this.render('./modules');
});

Router.route('/loggedin', function(){
    document.title="Welcome back";
    this.render('./loggedin');
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        alert(email);
        alert(password);
        Router.go('loggedin');
        var registeredstuff = new Object();
        registeredstuff.email = email;
        registeredstuff.password = password;

        var tojson = JSON.stringify(registeredstuff);
        console.log(tojson);
    }
    
});
