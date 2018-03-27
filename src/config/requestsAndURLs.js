import axios from "axios";

// CONSTANTS
const BASE_URL = 'http://localhost:3001';


// URLS
export function makeIndexURL() {
    return '/';
}

export function makeAboutURL() {
    return '/about';
}

export function makePostsURL() {
    return '/posts';
}

export function makePostURL(slug) {
    return '/posts/' + slug;
}

export function makeStaticPostURL() {
    return '/posts/:slug';
}

export function makeContactUrl() {
    return '/contact';
}

export function makeContactFormSubmitUrl() {
    return '/send-contact-mail';
}

export function makeImagesUrl(staticResource) {
    return '/images/' + staticResource;
}

export function makeRequestURL(resource) {
    return BASE_URL + resource;
}

export function makeImageSourceURL(staticResource) {
    return makeRequestURL(makeImagesUrl(staticResource));
}


// REQUESTS
export function getAbout() {
    return axios.get(makeRequestURL(makeAboutURL()));
}

export function getPosts() {
    return axios.get(makeRequestURL(makePostsURL()));
}

export function getPost(slug) {
    return axios.get(makeRequestURL(makePostURL(slug)));
}

export function postContactForm(data) {
    return axios.post(makeRequestURL(makeContactFormSubmitUrl()), data)
}