<template>
    <div class="card card-default">
        <div class="card-header">Course List</div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'courses.create' }" class="btn btn-success">
                  New Course
                </router-link>
            </div>
            <p v-if="courses.length == 0">There are no courses</p>
            <table v-if="courses.length != 0" class="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Points</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses">
                        <td>{{ course.title }}</td>
                        <td>{{ course.code }}</td>
                        <td>{{ course.description.substring(0,100) + "..." }}</td>
                        <td>{{ course.points }}</td>
                        <td>{{ course.level }}</td>
                        <td>
                            <router-link :to="{ name: 'editCourse', params: { id: course.id } }" class="btn btn-warning">Edit</router-link>
                            <button class="btn btn-danger" v-on:click="deleteCourse(course.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
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
        },
        data() {
            return {
                courses: []
            }
        },
        methods: {
            deleteCourse(courseId) {
                var app = this;

                if (confirm("Are you sure you want to delete this course (id =" + courseId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/courses/' +  courseId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.courses.findIndex(function (course) {
                            return course.id == courseId;
                        });
                        app.courses.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete course as students are enrolled");
                    });
                }
            }
        }
    }
</script>
