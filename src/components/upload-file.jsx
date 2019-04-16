import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import { storage } from '../backend'
import { Image } from '../backend/structures'

export default class UploadFile extends Component{
    constructor(props){
        super(props)
        this.initialState = { start: false, progress: 0 }
        this.state = { ...this.initialState}
    }
    componentDidMount(){
        this.uploadFile(this.props.data)
    }
    uploadFile(data){
        this.setState({ start: true })
        const { where, file, name, ext } = data
        const uploadTask = Image.upload(where, file)
        // const uploadTask = storage.updateFile(`posts/${PostModel.generateID(title)}.${filetype}`, file)
        uploadTask.on('state_changed', (snapshot) => {
            console.log('PROGRESS', (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({ progress : (snapshot.bytesTransferred / snapshot.totalBytes) * 100})
        }, (err) => {this.props.onError(err)},
        async (success) => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
            this.setState({ start: false })
            this.props.onFinish({where, url: downloadURL, name, ext})
        })
    }
    onStart(where, file){
        this.setState({start: true})
        this.uploadFile(this.props.data)
    }
    reset(){

        this.setState(this.initialState)
    }
    render(){
        console.log('STATE',this.state)
        return (<div>
            {this.state.start && 
                (<ProgressBar value={this.state.progress}/>)
            }
        </div>)
    }
}

export const ProgressBar = ({ value, color }) => (<Progress color={color} value={value} />)