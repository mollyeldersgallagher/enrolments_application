<template>
    <div class="card card-default">
        <div class="card-header">Edit enrolement</div>

        <div class="card-body">
          <!-- vue attribute on submit calls saveForm from methods object returned -->
            <form v-on:submit="saveForm()">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Date</label>
                        <input type="text" v-model="enrolment.date" class="form-control">
                        <!-- error message will be displayed from array of errors if validation fails -->
                        <p class="text-danger" v-if="errors.date">{{ errors.date[0] }}</p>
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Time</label>
                        <input type="text" v-model="enrolment.time" class="form-control">
                        <p class="text-danger" v-if="errors.time">{{ errors.time[0] }}</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-4 form-group">
                        <label>Status</label>
                        <input type="text" v-model="enrolment.status" class="form-control">
                        <p class="text-danger" v-if="errors.status">{{ errors.status[0] }}</p>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Student</label>
                        <select v-model="enrolment.student_id" class="form-control">
                            <option v-for="student in students" :value="student.id">
                                {{ student.name }}
                            </option>
                        </select>
                        <p class="text-danger" v-if="errors.course_id">{{ errors.course_id[0] }}</p>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Course</label>
                        <select v-model="enrolment.course_id" class="form-control">
                            <option v-for="course in courses" :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>
                        <p class="text-danger" v-if="errors.course_id">{{ errors.course_id[0] }}</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Update</button>
                        <router-link to="/" class="btn btn-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        // returns an enrolement object, array of student and courses
        data: function () {
            return {
                enrolment: {
                    date: '',
                    time: '',
                    status: '',
                    student_id: '',
                    course_id: '',
                },

                students: [],
                courses: [],
                errors: {}
            }
        },
        mounted() {
            var app = this;
            var id = app.$route.params.id;
            var token = localStorage.getItem('token');

            // below you can see there are many axios requests and catch functions, the then functions will only
            // be called and executed after all the axios reqeusts have been sent as mounted is called on page load
            // each axios request has an Authorization header followed by a token as a user mused be logged in to be able
            // to create read update or delete any data
            axios.get('/api/enrolments/' + id, {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.enrolment = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load enrolment');
            });

            axios.get('/api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.courses = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load courses');
            });

            axios.get('/api/students', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.students = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load students');
            });
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                // retrieves the id from the params passed to the component through the path
                var id = app.$route.params.id;
                // creates a new temp object with all the values submitted
                var newEnrolment = app.enrolment;
                // token retrieved from storage to be sent in Authorization header in http request

                var token = localStorage.getItem('token');
                // axios put request sent with token and a request body containing the json objest of the new temp object
                axios.put('/api/enrolments/' + id, newEnrolment, {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(function (resp) {
                    // if sucessfull change component
                    app.$router.push({name: 'enrolments'});
                })
                .catch(function (resp) {
                    app.errors = resp.response.data;
                });
            }
        }
    }
</script>
