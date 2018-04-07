import React from 'react';

import UserInfo from './UserInfo';
import InfoMessage from '../InfoMessage/InfoMessage';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './about.css';
import * as requestsAndURLs from '../../config/requestsUtility';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasNotLoadedUsersYet: true,
            users: [],
            hasError: false
        };
    }

    componentDidMount() {
        // Return the promise here, so that the promise can get chained in the tests!
        return requestsAndURLs.getAbout()
            .then(res => {
                this.setState({
                    hasNotLoadedUsersYet: false,
                    users: res.data,
                    hasError: false
                });
            })
            .catch(error => {
                this.setState({
                    hasNotLoadedUsersYet: false,
                    posts: [],
                    hasError: true
                });
            });
    }

    renderAuthors() {
        const {hasError, hasNotLoadedUsersYet, users} = this.state;
        let toBeRendered;

        if (hasNotLoadedUsersYet) {
            // As long as we have no data, show a loading indicator.
            toBeRendered = <LoadingIndicator text='Loading...'/>;
        } else if (hasError) {
            // The promise was rejected by the server. Inform the user!
            toBeRendered = <InfoMessage iconClass='em em-no_entry' text='Could not get proper response from server'/>;

        } else if (users.length === 0) {
            // The promise resolved but the list is empty and therefore there's nothing to display.
            // Inform the user!
            toBeRendered = <InfoMessage iconClass='em em-ghost' text='No authors seem to exist...'/>;

        } else {
            // We have a list of authors, simply display it.
            toBeRendered =  <ul className='about__usersList'>
                                {
                                    users.map( (user) => {
                                        return <UserInfo key={user.id} user={user} />;
                                    })
                                }
                            </ul>;

        }

        return toBeRendered;
    };

    render() {
        return (
            <div className='about'>
                <h1 className='about__mainTitle'>About the authors</h1>
                { this.renderAuthors() }
            </div>
        );
    }
}

export default About;
