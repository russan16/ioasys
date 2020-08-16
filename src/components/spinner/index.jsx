import React from 'react';

export default function Spinner(props) {
    return(
        <>
            {props.status && (
                <div className="overlay w-100 min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
}