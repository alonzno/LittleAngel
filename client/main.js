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
function tim_tom(e){
    var questions = e.rows[0].doc.questions;
    var limit = questions.length;
    for(var i = 0; i < limit; i++){
        var p = document.createElement("P");
        p.setAttribute("class", "question");
        var t = document.createTextNode(questions[i]);
        p.appendChild(t);
        document.body.appendChild(p);
        var input = document.createElement("INPUT");
        input.setAttribute("class", "q_input");
        input.setAttribute("placeholder", "Enter Answer Here");
        document.body.appendChild(input);
    }
}

Router.route('/survey', function() {
    this.render('survey');
    document.title="Survey to get to know you";
    fetch('http://18.222.149.151:5984/surveys/_all_docs?include_docs=true')
    .then(response => response.json())
    .then(json => tim_tom(json));
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
