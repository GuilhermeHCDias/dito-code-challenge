import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import DitoTimeline from './components/DitoTimeline/DitoTimeline';
import './assets/styles/views/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { groupByTransactionId } from './services/utils';

const API_URL = 'https://storage.googleapis.com/dito-questions/events.json';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsPurchased: []
        };
    }

    componentDidMount() {
        axios.get(API_URL)
            .then((response) => {
                this.setState({ productsPurchased: groupByTransactionId(response.data) });

            })
            .catch((error) => {
                this.notify(error.message);
            });
    }

    notify = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    render() {
        const { productsPurchased } = this.state;
        return (
            <div className="dito-index-content">
                <ToastContainer />
                <DitoTimeline
                    payload={productsPurchased} />
                <a
                    className="linkedin-profile-redirect"
                    target="blank"
                    href="https://www.linkedin.com/in/guilherme-dias-564023a3/"
                >
                    Guilherme Dias
                </a>
            </div>
        );
    }
}

export default App;
