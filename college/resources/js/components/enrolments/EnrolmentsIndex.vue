<!-- Enrolment index component
A component can be defined as content structure, it contains html and vue js in tag functions to pull data and display them in a ceirtain structure, in this case a table.
withing a component all the data is gathered as objects and the object properties can then be used as variables throughout the page  -->
<template>
    <div class="card card-default">
        <div class="card-header">enrolments list</div>

        <div class="card-body">
            <div class="form-group">
              <!-- a router link is a link generated in vue to swap out and replace component already in place
                   In this case the enrolments index will be replace with the enrolments create component.
                    the components are linked to a route within the app.js file -->
                <router-link :to="{ name: 'enrolments.create' }" class="btn btn-success">
                  New Enrol

                </router-link>
            </div>
            <!-- vue in tag attributes can be used throughout the component due to the vue object creates which targets the
            html elements in the view welcome.blage file, any component that is loaded into this element can use the vue attributes
            in this case the vue attribute if statements are used-->
            <p v-if="enrolments.length == 0">There are no enrolments</p>
            <table v-if="enrolments.length != 0" class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Course</th>
                        <th>Student</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   <!-- vue attribute for each loop  -->
                    <tr v-for="enrolment in enrolments">
                        <!-- variables used from the object properties returned from the data function  -->
                        <td>{{ enrolment.date }}</td>
                        <td>{{ enrolment.time }}</td>
                        <td>{{ enrolment.status }}</td>
                        <td>{{ enrolment.course.title }}</td>
                        <td>{{ enrolment.student.name }}</td>
                        <td>
                            <!-- router link to edit component passinf the enrolment id as a parameter that will be passed into the url to the api controller
                            to manipulate data in the database -->
                            <router-link :to="{ name: 'editEnrolment', params: { id: enrolment.id } }" class="btn btn-warning">Edit</router-link>
                            <!-- vue attribute on click event listener calls deleteEnrolment function from our methods object in our default function-->
                            <button class="btn btn-danger" v-on:click="deleteEnrolment(enrolment.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
      // Mounted function is a lifecyle method. This means whenever the page is loaded or refreshed
      // this function will be involked as it is a vue lifecyle event
        mounted() {
            var app = this;
            // The user has logged in and retrieved a token that was storred in local Storage
            // the token is then retreived from local storage to be sent in a axios http get request.
            var token = localStorage.getItem('token');
            // axios get request is sent with an authentification header along with the token
            // this token is checck to see if it exist in the database to determine if the user is logged in
            // if so the reponse will contain the token in the header and return a json object of the results
            // in this case all enrolments
            axios.get('/api/enrolments', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                // setting the data returned from the responce if sucessfull into an array of enrolements
                app.enrolments = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load enrolments');
            });
        },
        data() {
            return {
                //enrolments object returned -> properties of this object are variables we can use in our template
                // as seen above with enrolments.name, this retreives the name of the enrolement object
                enrolments: []
            }
        },
        //methods is an object that contains functions - > such as deleteEnrolment
        //purpose of methods object is to define a sequence of methods that can be used within the vue component in this case to delete an enrolement

        methods: {
            deleteEnrolment(enrolmentId) {
                var app = this;
                // if statement prompting user are the sure they want to delete
                if (confirm("Are you sure you want to delete this enrolment (id =" + enrolmentId + " )?")) {
                  // if the user confirms to delete the token is retrieved from storage to be sent in the request header
                    var token = localStorage.getItem('token');
                    // axios http delete request is sent to the database through the delete function in the enrolments api
                    axios.delete('/api/enrolments/' +  enrolmentId, {
                      // attaching token to the request header
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                      // if request is sucessfull the enrolment id is used to find the enrolment to splice it out of the array of
                      // enrolments
                        var index = app.enrolments.findIndex(function (enrolment) {
                            return enrolment.id == enrolmentId;
                        });
                        // removes enrolment from the array
                        app.enrolments.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete enrolment!!");
                    });
                }
            }
        }
    }
</script>
