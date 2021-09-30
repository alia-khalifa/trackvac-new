import React, { Component } from 'react'
import { Rating } from "@material-ui/lab";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from 'react-bootstrap/Button'
import api from '../api';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { display } from '@mui/system';
export default class Review extends Component {

    state = {
        vote: this.props.vote,
        rate: this.props.rate,
        _id: this.props._id,
        show: false,
        upVoted: false,
        downVoted: false
    }

    async handleReport() {

        await api.updateReport(this.props._id).then(() => { }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
        this.handleShow();
    }
    handleShow() {
        this.setState({
            show: true
        })
    }
    handleClose() {
        this.setState({
            show: false
        })
    }
    async handleUpvote() {
        const { upVoted, downVoted, vote } = this.state
        await api.updateVote({ vote: vote + 1 }, this.state._id).then(() => {
            if (!downVoted && !upVoted) {

                this.setState({
                    vote: vote + 1,
                    upVoted: true
                })

            } else if (downVoted) {

                this.setState({
                    vote: vote + 1,
                    downVoted: false
                })
            }
            this.props.onVoteChange(this.props._id, this.state.vote, false)
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
    }


    async handleDownvote() {
        const { upVoted, downVoted, vote } = this.state
        await api.updateVote({ vote: vote - 1 }, this.state._id).then(() => {
            if (!upVoted && !downVoted) {
                this.setState({
                    vote: vote - 1,
                    downVoted: true
                })
            } else if (upVoted) {
                this.setState({
                    vote: vote - 1,
                    upVoted: false
                })
            }
            this.props.onVoteChange(this.props._id, this.state.vote, false)
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
    }
    render() {
        const { vote, lang } = this.props
        return (
            <div className="review" style={{ padding: "10px 10px 10px 10px" }}>




                <div className="upvote">
                    <ArrowUpwardIcon onClick={this.handleUpvote.bind(this)} className="arrow" />
                    <p>{vote ? vote : 0}</p>
                    <p>{lang ? "vote" : "تصويت "}</p>
                    <ArrowDownwardIcon onClick={this.handleDownvote.bind(this)} className="arrow" />
                </div>


                {/* review body */}
                <div className="review-body">
                    <Rating name="read-only" value={this.props.rate} readOnly />
                    <h3> {this.props.title} </h3>
                    <p>{this.props.body}</p>
                    <br />
                    <div className="review-bottom">
                        <p>{this.props.date}</p>
                        <p onClick={this.handleReport.bind(this)} className="reply-button">{lang ? "Report" : "إبلاغ"}</p>
                    </div>
                </div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Review reported successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <h3 style={{ textTransform: 'lowercase' }}>Thank you for reporting ! , we will look into it as soon as possible.</h3>

                    </Modal.Body>

                </Modal>

            </div >
        )
    }
}
