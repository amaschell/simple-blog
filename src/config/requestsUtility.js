import axios from "axios";

/*
    All routes and URL's that exist for this application. The base URL is absolute, all the others are relative.
 */
const BASE_URL = 'http://localhost:3001';

const INDEX_URL = '/';
const ABOUT_URL = '/about';
const POSTS_URL = '/posts';
const POST_URL = '/posts/:slug';
const CONTACT_URL = '/contact';
const IMAGES_URL = "/images";
const POST_CONTACT_FORM_URL = "/send-contact-mail";


/*
    Getters that are used for defining the routes in the router. These methods are also useful for testing.
 */
export function makeRequestURL(resource) {
    return BASE_URL + resource;
}

export function makeIndexURL() {
    return INDEX_URL;
}

export function makeAboutURL() {
    return ABOUT_URL;
}

export function makePostsURL() {
    return POSTS_URL;
}

export function makePostURL(slug) {
    return POSTS_URL + '/' + slug;
}

export function makeStaticPostURL() {
    return POST_URL;
}

export function makeContactUrl() {
    return CONTACT_URL;
}

export function makeContactFormSubmitUrl() {
    return POST_CONTACT_FORM_URL;
}

export function makeImagesUrl(staticResource) {
    return IMAGES_URL + '/' + staticResource;
}

export function makeImageSourceURL(staticResource) {
    return makeRequestURL(makeImagesUrl(staticResource));
}


/*
    Requests that are performed inside the respective components.
 */
export function getLatestPostForHome() {
    return axios.get(makeRequestURL(makeIndexURL()));
}

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