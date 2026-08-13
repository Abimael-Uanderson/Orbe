import { mount } from 'svelte';
import App from './App.svelte';
import './design-system/styles/index.css';

mount(App, { target: document.getElementById('app')! });
