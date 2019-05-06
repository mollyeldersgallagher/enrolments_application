<!-- Login component
A component can be defined as content structure, it contains html and vue.js in tag functions to pull data and display them in a ceirtain structure.
it is also made up of data and methods as seen below   -->

<!-- template tag contains all the html and content structure throughout the component -->
<template>
    <div class="card card-default">
        <div class="card-header">Login</div>

        <div class="card-body">
          <!-- On submit of the for an in tag vue attribute listens for an on submit even
          on submit the login function is called from within the script tag below  -->
            <form v-on:submit="login()">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Email</label>
                        <!-- Data variable can be used from the data that is pulled within the script tag. user.email is the email
                         assosiated with the user object -->
                        <input type="text" v-model="user.email" class="form-control">
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Password</label>
                        <input type="text" v-model="user.password" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Login</button>
                        <!-- Vue in tag attrubte if statement  -->
                        <p class="text-danger" v-if="errorMessage != ''">{{ errorMessage }}</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {

      // Data function is a function that returns an object, the object properties returned
      // can be used throughout the vue component as variables
        data: function () {
            return {
              //json object
                user: {
                    // object properties
                    email: '',
                    password: ''
                },
                errorMessage: ''
            }
        },

        // Mounted function is a lifecyle method. This means whenever the page is loaded or refreshed
        // this function will be involked as it is a vue lifecyle event
        mounted() {
            var app = this;
            // If a token was stored in local storage and not empty
            // replaace the login component with the compponent mapped to the name home.
            if (localStorage.getItem('token') !== null) {
                app.$router.replace({name: 'home'});
            }
        },
        //Methods is an object that contains functions
        //this objects purpose is to define a sequence of methods that can be used within the component
        // in this case as seen above this login function is called and executed when the login form is submitted
        methods: {
            login() {
              //proventing default events from occuring
                event.preventDefault();
                // setting this component object to variable app
                var app = this;
                // axios sending a post http request to the server it the link to the api function
                // along with a json object withing the body of the request containing the users email and password
                axios.post('/api/login', app.user)
                    // If login is sucessfull the responce is passed into the function
                    .then(function (resp) {
                      // the reponse should contain a token in the response authentification header
                      // this token is stored in local storage as we need ot pull it out
                      // again when sending other requests and checking authentification
                        localStorage.setItem('token', resp.data.token);
                        // after token is set, replace login component with home component
                        app.$router.push({name: 'home'});
                    })
                    // if error occurs display error message
                    .catch(function (resp) {
                        app.errorMessage = "It didn't work!";
                    });
            }
        }
    }
</script>
