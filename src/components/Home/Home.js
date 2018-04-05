import React from 'react';

import * as requestsAndURLs from '../../config/requestsUtility';
import InfoMessage from '../InfoMessage/InfoMessage';
import LatestPostPreview from './LatestPostPreview';
import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latestPost: null,
            errorWhileFetchingLatestPost: false
        }
    }

    componentDidMount() {
        // Return the promise here, so that the promise can get chained in the tests!
        return requestsAndURLs.getLatestPostForHome()
            .then(res => {
                this.setState({
                    latestPost: res.data,
                    errorWhileFetchingLatestPost: false
                });
            })
            .catch(error => {
                this.setState({
                    latestPost: null,
                    errorWhileFetchingLatestPost: true
                });
            });
    }

    renderLatestPostIfExisting() {
        let toBeRendered;

        const {errorWhileFetchingLatestPost, latestPost} = this.state;

        if (errorWhileFetchingLatestPost) {
            toBeRendered = <InfoMessage iconClass="em em-ghost"
                                        text="An error occurred on the server while fetching the latest post..."/>;
        } else if (latestPost) {
            toBeRendered = <LatestPostPreview latestPost={latestPost} />;
        } else {
            // This means that no error occurred on the server but we got no latest post object back. In that case,
            // we assume that there's no latest post yet existing.
            toBeRendered = null;
        }

        return toBeRendered;
    }

    render() {
        return (
            <div className="home">
                <section className="home__introduction">
                    <h1 className="home__title">Welcome to the world's most awesome and simplest blog!</h1>
                    <p className="home__presentationText">
                        What started as a plain side project, is slowly turning into the next big thing, ladies and
                        gentlemen! This blog tries to be simple, yes. But it also tries to be not <em>that simple </em>
                        so that one could regard it as boring or ugly. On the one hand refreshingly new and exciting.
                        And on the other hand exceedingly familiar and convenient.<br/>
                        But most notably: <b>It is simply a blog!</b>
                        <br/><br/>
                        <em className="home__finalPresentationPhrase">
                            One blog to rule them all, one blog to find them, one blog to bring them all and in
                            the simplicity bind them!
                        </em>
                    </p>
                </section>

                {this.renderLatestPostIfExisting()}
            </div>
        );
    }

}

export default Home;
