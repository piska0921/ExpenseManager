import React from 'react'
import Ionicon from 'react-ionicons'


const CreateBtn = ({onCreateClicked}) => {
    return (
        <div className="row" onClick={onCreateClicked} style={{cursor: 'pointer'}}>
            <div className="col py-2" style={{ backgroundColor: '#457be9', color: '#fff' }}>
                <Ionicon
                    className="rounded-circle"
                    fontSize="30px"
                    style={{ padding: '5px' }}
                    color={'#fff'}
                    icon='ios-add-circle-outline' />
            Create a new record
            </div>
        </div>
    )
}

export default CreateBtn