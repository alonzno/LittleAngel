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
function load_survey(e){
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

function mod_clicked(e){
    Router.go("survey");
}

function load_modules(e){
    var modules = []
    for(var i = 0; i < e.rows.length; i++){
        let curr_module = e.rows[i].value;
        modules.push(curr_module);
        let btn = document.createElement("BUTTON");
        btn.setAttribute("class", "mod_button");
        btn.addEventListener("click", function(){mod_clicked(curr_module);});
        var t = document.createTextNode(curr_module);
        btn.appendChild(t);
        document.body.appendChild(btn);
        document.body.appendChild(document.createElement("BR"));
        document.body.appendChild(document.createElement("BR"));
    }
}

Router.route('/survey', function() {
    this.render('survey');
    fetch('http://18.222.149.151:5984/surveys/_all_docs?include_docs=true')
    .then(response => response.json())
    .then(json => load_survey(json));
});


Router.route('/modules', function(){
    this.render('./modules');
    fetch('http://18.222.149.151:5984/modules/_design/nameView/_view/name-view')
    .then(response => response.json())
    .then(json => load_modules(json));
});

// Router.route('/loggedin', function(){
//     document.title="Welcome back";
//     this.render('./modules');
// });

function has_authenticated(e, usere, userp){
    var em = e.rows[0].doc.email;
    var p = e.rows[0].doc.pass;
    if ( em != usere){
        auth =false;
        return false;
    }
    if ( p != userp){
        auth = false;
        return false;
    }
    auth = true;
    return true;
}

function evaluate(e){
    if (e == true){
        Router.go('modules');
    }else{
        alert("Error Incorrect Login Information Entered");
        Router.go('/');
    }
}

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        
         fetch('http://18.222.149.151:5984/users/_all_docs?include_docs=true')
        .then(response => response.json())
        .then(json => has_authenticated(json, email,password))
        .then(value => evaluate(value));     
    }
});