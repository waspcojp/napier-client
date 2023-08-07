import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Index from '../svelte/index.svelte';



const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
    new bootstrap.Tooltip(tooltipTriggerEl));

let target = document.getElementById('home');

const index = new Index({
    target: target
});
export default index;
