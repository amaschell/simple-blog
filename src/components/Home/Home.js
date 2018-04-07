import React from 'react';

import * as requestsAndURLs from '../../config/requestsUtility';
import * as utils from '../../utils/utils';
import InfoMessage from '../InfoMessage/InfoMessage';
import LatestPostPreview from './LatestPostPreview';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasNotLoadedLatestPostYet: true,
            latestPost: null,
            errorWhileFetchingLatestPost: false
        };
    }

    componentDidMount() {
        // Return the promise here, so that the promise can get chained in the tests!
        return requestsAndURLs.getLatestPostForHome()
            .then(res => {
                // If the response is empty, we assume that there is no latest post yet and in that case we need
                // to set the state accordingly.
                const latestPost = utils.isEmptyObject(res.data) ? null : res.data;

                this.setState({
                    hasNotLoadedLatestPostYet: false,
                    latestPost: latestPost,
                    errorWhileFetchingLatestPost: false
                });
            })
            .catch(error => {
                this.setState({
                    hasNotLoadedLatestPostYet: false,
                    latestPost: null,
                    errorWhileFetchingLatestPost: true
                });
            });
    }

    renderLatestPostIfExisting() {
        let toBeRendered;

        const {errorWhileFetchingLatestPost, hasNotLoadedLatestPostYet, latestPost} = this.state;

        if (hasNotLoadedLatestPostYet) {
            // As long as we have no data for the latest post, show a loading indicator.
            toBeRendered = <LoadingIndicator text='Loading...'/>;
        } else if (errorWhileFetchingLatestPost) {
            toBeRendered = <InfoMessage iconClass='em em-ghost'
                                        text='An error occurred on the server while fetching the latest post...'/>;
        } else if (latestPost) {
            toBeRendered = <LatestPostPreview latestPost={latestPost} />;
        } else {
            // This means that no error occurred on the server but we got no latest post object back. In that case,
            // we assume that there's no latest post yet existing and we do not render the latest post section.
            toBeRendered = null;
        }

        return toBeRendered;
    }

    render() {
        return (
            <div className='home'>
                <section className='home__introduction'>
                    <h1 className='home__title'>Welcome to the world's most awesome and simplest blog!</h1>
                    <p className='home__presentationText'>
                        What started as a plain side project, is slowly turning into the next big thing, ladies and
                        gentlemen! This blog tries to be simple, yes.
                        <br/>
                        But it also tries to be not <em>that simple </em>
                        so that one could regard it as boring or ugly.
                        <br/><br/>
                        On the one hand refreshingly new and exciting.
                        And on the other hand exceedingly familiar and convenient.<br/>
                        But most notably: <b>It is simply a blog!</b>
                        <br/><br/>
                        <em className='home__finalPresentationPhrase'>
                            "One blog to rule them all, one blog to find them, one blog to bring them all and in
                            the simplicity bind them!"
                        </em>
                    </p>
                </section>

                <section className='home__latestPostSection'>
                    {this.renderLatestPostIfExisting()}
                </section>
            </div>
        );
    }
}

export default Home;
