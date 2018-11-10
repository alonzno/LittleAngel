import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/*import user collection*/
import "../modules/survey.js";

import './main.html';


Router.route('/', function () {
    this.render('register');
  });

function tim_tom(){
    alert("swag");
}

Router.route('/survey', function() {
    this.render('survey');

    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
    tim_tom();

});



Router.configure('/modules', function(){
    path: './modules'
    
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
    }
});