import React from 'react'
import { FormGroup, Label, Input, Col, Row, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Button, { ButtonDanger, ButtonPrimary } from './button'
import withStore from '../hocs/with-store'
import CustomModal from './custom-modal'
import locale from '../config/locale'

export default withStore(class extends React.Component{
    constructor(props){
        super(props)
        this.state = {open : false, selected : [], multiple : this.props.multiple}
    }
    select(url){
        if(!this.state.multiple && this.state.selected.length > 0 && !this.state.selected.includes(url)){
            return
        }
        const selected = this.state.selected.includes(url) ? [...this.state.selected.filter(imageID => imageID !== url)] : [...this.state.selected, url]
        this.setState({selected})
    }
    onAccept(){
        const { selected } = this.state
        this.reset()
        this.props.onAccept(selected)
    }
    onCancel(){
        this.reset()
        this.props.onCancel()
    }
    reset(){
        this.setState({open: false, selected : []})
    }
    toggle(){
        this.setState({open : !this.state.open})
    }
    render(){
        return (
            <>
                {/* {!this.state.open && (
                    <div>
                        <Button className='mr-2' onClick={() => this.toggle()}>{this.props.titleOpenButton}</Button>
                        {this.props.children}
                    </div>)
                } */}
                <CustomModal open={this.state.open} toggle={() => this.toggle()} buttonLabel={this.props.titleOpenButton}>
                    <ModalHeader>{this.props.titleOpenButton}</ModalHeader>
                    <ModalBody>
                        <div className='row mb-2'>
                            {this.props.images.map(image => 
                                <div className='col-6 col-md-4 mb-2' key={image}>
                                    <img className={`${this.state.selected.includes(image.url) ? 'th-selected-highlight' : ''} w-100`} onClick={(e) => this.select(image.url)} src={image.url} alt={image.id} />
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.props.children}
                        <ButtonDanger className='mx-2' onClick={() => this.onCancel()}>{locale.Cancel}</ButtonDanger>
                        <ButtonPrimary className='mx-2' onClick={() => this.onAccept()}>{locale.Accept} {this.state.selected.length ? ` (${this.state.selected.length})` : ''}</ButtonPrimary>
                    </ModalFooter>
                </CustomModal>
                {!this.state.open && (
                    <div>
                        {/* <Button className='mr-2' onClick={() => this.toggle()}>{this.props.titleOpenButton}</Button> */}
                        {this.props.children}
                    </div>)
                }
                {/* {this.state.open && this.props.images && (
                    <>
                        <Row className='mb-2'>
                            {this.props.images.map(image => {
                                console.log(image, this.state.selected.includes(image),this.state.selected)
                                return (
                                <Col md='4' className='mb-2' key={image}>
                                        <img className={`${this.state.selected.includes(image) ? 'th-selected-highlight' : ''} w-100`} onClick={(e) => this.select(image)} src={image} alt={image} />
                                </Col>
                            )})}
                        </Row>
                        <Row className='mb-2'>
                            <Button className='mx-2' onClick={() => this.onCancel()}>Cancel</Button>
                            <Button className='mx-2' onClick={() => this.onAccept()}>Accept { this.state.selected.length ? ` (${this.state.selected.length})` : ''}</Button>
                        </Row>
                    </>
                )} */}
            </>
        )
    }
})
