<template>
    <div class="card card-default">
        <div class="card-header">Student List</div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'students.create' }" class="btn btn-success">
                  New Student
                </router-link>
            </div>
            <p v-if="students.length == 0">There are no students</p>
            <div v-if="students.length != 0" class="row">
                <div class="card" v-for="student in students" style="width: 18rem;">
                    <h5 class="card-header">{{student.name}} </h5>
                    <div class="card-body">
                        <p class="card-text">Address: {{ student.address }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Email: {{ student.email }}</li>
                        <li class="list-group-item">Phone: {{ student.phone }}</li>
                    </ul>
                    <div class="card-body">
                        <router-link :to="{ name: 'editStudent', params: { id: student.id } }" class="btn btn-warning">Edit</router-link>
                        <button class="btn btn-danger" v-on:click="deleteStudent(student.id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>

    export default {
        mounted() {
            var app = this;
            var token = localStorage.getItem('token');
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
        data() {
            return {
                students: []
            }
        },
        methods: {
            deleteStudent(studentId) {
                var app = this;

                if (confirm("Are you sure you want to delete this student (id =" + studentId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/students/' +  studentId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.students.findIndex(function (student) {
                            return student.id == studentId;
                        });
                        app.students.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete studentas student is enrolled");
                    });
                }
            }
        }
    }
</script>
