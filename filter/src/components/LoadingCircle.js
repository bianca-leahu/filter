import React, { Component } from 'react';

export default class LoadingCircle extends Component {
    render() {
        return (
            <div className="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }
}