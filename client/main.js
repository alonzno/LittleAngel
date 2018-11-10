import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/*import user collection*/
import "../modules/survey.js";
import './main.html';


Router.route('/', function () {
    this.render('register');
  });

Router.route('/survey', function() {
    this.render('survey');
});

Router.route('/modules', function(){
    this.render('modules');
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