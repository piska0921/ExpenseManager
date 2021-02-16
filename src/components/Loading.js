import React from 'react'
import Ionicon from 'react-ionicons'

const Loading = () => {
    return (
        <div className="loading-component text-center">
            <Ionicon icon="ios-refresh"
                fontSize="40px"
                rotate={true} />
            <h5> Loading...</h5>
        </div>
    )

}

export default Loading