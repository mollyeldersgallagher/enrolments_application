<template>
    <div class="card card-default">
        <div class="card-header">Edit Student</div>

        <div class="card-body">
            <form v-on:submit="saveForm()">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Name</label>
                        <input type="text" v-model="student.name" class="form-control">
                        <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Address</label>
                        <input type="text" v-model="student.address" class="form-control">
                        <p class="text-danger" v-if="errors.address">{{ errors.address[0] }}</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Email</label>
                        <input type="email" v-model="student.email" class="form-control">
                        <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
                    </div>
                    <div class="col-md-6 form-group">
                      <label>Phone</label>
                      <input type="text" v-model="student.phone" class="form-control">
                      <p class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</p>
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
        data: function () {
            return {
                student: {
                    name: '',
                    address: '',
                    email: '',
                    phone: '',

                },

                errors: {}
            }
        },
        mounted() {
            var app = this;
            var id = app.$route.params.id;
            var token = localStorage.getItem('token');
            axios.get('/api/students/' + id, {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.student = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load student');
            });

        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var id = app.$route.params.id;
                var newStudent = app.student;
                var token = localStorage.getItem('token');
                axios.put('/api/students/' + id, newStudent, {
                    headers: { Authorization: "Bearer " + token }
                })
                .then(function (resp) {
                    app.$router.push({name: 'students'});
                })
                .catch(function (resp) {
                    app.errors = resp.response.data;
                });
            }
        }
    }
</script>
