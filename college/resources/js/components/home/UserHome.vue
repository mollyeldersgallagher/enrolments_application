<template>
    <div>
        <!-- The sidebar -->
        <div class="sidebar">
          <router-link :to="{ name: 'enrolments' }" active-class="active">Enrolments</router-link>
          <router-link :to="{ name: 'courses' }" active-class="active">Courses</router-link>
          <router-link :to="{ name: 'students' }" active-class="active">Students</router-link>

            <button v-on:click="logout()" class="btn btn-primary m-3">Logout</button>
        </div>

        <!-- Page content -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
/* The side navigation menu */
.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
    overflow: auto;
}

/* Sidebar links */
.sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
}

/* Active/current link */
.sidebar a.active {
    background-color: #6C6C6C;
    color: white;
}

/* Links on mouse-over */
.sidebar a:hover:not(.active) {
    background-color: #555;
    color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
    .sidebar a {float: left;}
    div.content {margin-left: 0;}
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
    .sidebar a {
        text-align: center;
        float: none;
    }
}
</style>

<script>
    export default {
        data: function () {
            return {
            }
        },
        mounted() {
            var app = this;
            if (localStorage.getItem('token') === null) {
                app.$router.replace({name: 'login'});
            }
        },
        methods: {
            logout() {
                var app = this;
                var token = localStorage.removeItem('token');
                app.$router.push({ name: 'login' });
            }
        }
    }
</script>
