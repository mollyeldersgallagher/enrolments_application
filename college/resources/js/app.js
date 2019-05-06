
/**
 * Loading all JavaScript dependencies which in this case are Vue, Vue Router and bootstrap
 * libraries.
 */

require('./bootstrap');


import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * Importing all the Vue components
 */
import LoginForm from './components/auth/LoginForm.vue';
import UserHome from './components/home/UserHome.vue';

import EnrolmentsIndex from './components/enrolments/EnrolmentsIndex.vue';
import CreateEnrolment from './components/enrolments/CreateEnrolment.vue';
import EditEnrolment from './components/enrolments/EditEnrolment.vue';

import CoursesIndex from './components/courses/CoursesIndex.vue';
import CreateCourse from './components/courses/CreateCourse.vue';
import EditCourse from './components/courses/EditCourse.vue';

import StudentsIndex from './components/students/StudentsIndex.vue';
import CreateStudent from './components/students/CreateStudent.vue';
import EditStudent from './components/students/EditStudent.vue';

/**
 * here you will see the creatation of a Vue application instance and attach it to
 * the page. Below the JavaScript scaffolding is set up through mapping components to path
 */

Vue.use(VueRouter);

// Array of routes
const routes = [
    // Each route consists if a path, a name and the component the name and path
    // will be mapped to. In this case the LoginForm component has the name login and
    // the path of /, the forward slash will display in the url and show the user where
    // they are on the page.
    {
        path: '/',
        name: 'login',
        components: {
            loginForm: LoginForm
        }
    },
    // each router object can have children router objects
    // As seen below, when user is logged in and only on the home page the
    // user will be able to access the children routes of the user home component
    {
        path: '/home',
        component: UserHome,
        name: 'home',
        children: [
            {
                path: 'enrolments',
                name: 'enrolments',
                component: EnrolmentsIndex
            },
            {
                path: 'enrolments/create',
                name: 'enrolments.create',
                component: CreateEnrolment
            },
            {
                path: 'enrolments/:id/edit',
                component: EditEnrolment,
                name: 'editEnrolment'
            },
            {
                path: 'courses',
                name: 'courses',
                component: CoursesIndex
            },
            {
                path: 'courses/create',
                name: 'courses.create',
                component: CreateCourse
            },
            {
                path: 'courses/:id/edit',
                component: EditCourse,
                name: 'editCourse'
            },
            {
                path: 'students',
                name: 'students',
                component: StudentsIndex
            },
            {
                path: 'students/create',
                name: 'students.create',
                component: CreateStudent
            },
            {
                path: 'students/:id/edit',
                component: EditStudent,
                name: 'editStudent'
            }
        ]
    },
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router
});
