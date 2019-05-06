<template>
    <div class="card card-default">
        <div class="card-header">Create new Enrol</div>

        <div class="card-body">
            <form v-on:submit="saveForm()">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Date</label>
                        <input type="text" v-model="enrolment.date" class="form-control">
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
                        <label>Course</label>
                        <select v-model="enrolment.course_id" class="form-control">
                            <option v-for="course in courses" :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>
                        <p class="text-danger" v-if="errors.course_id">{{ errors.course_id[0] }}</p>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Student</label>
                        <select v-model="enrolment.student_id" class="form-control">
                            <option v-for="student in students" :value="student.id">
                                {{ student.name }}
                            </option>
                        </select>
                        <p class="text-danger" v-if="errors.student_id">{{ errors.student_id[0] }}</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Create</button>
                        <router-link to="/" class="btn btn-secondary">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                enrolment: {
                    date: '',
                    time: '',
                    status: '',
                    course_id: '',
                    student_id: '',
                },
                courses: [],
                students: [],
                errors: {}
            }
        },
        mounted() {
            var app = this;
            var token = localStorage.getItem('token');
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
                var newEnrolment = app.enrolment;
                var token = localStorage.getItem('token');
                 axios.post('/api/enrolments', newEnrolment, {
                    headers: { Authorization: "Bearer " + token }
                    })

                .then(function (resp) {
                        app.$router.push({name: 'enrolments'});
                    })

                .catch(function (resp) {
                        app.errors = resp.response.data;
                    })
            }
        }
    }
</script>
