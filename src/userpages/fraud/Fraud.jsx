import React, { useRef, useState, Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FraudLogo from './fraud.svg';

import './Fraud.scss'

function FraudComponent(props) {

    const searchInput = useRef('')
    const [searchResults, setSearchResults] = useState(undefined)
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        type: '',
        message: ''
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        phone: '',
        account: '',
        upi: '',
        details: '',
        region: '',
        r_email: '',
        r_phone: '',
    });

    const handleChangeForm = name => event => {
        setFormValues({ ...formValues, [name]: event.target.value });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar({...snackbar, openSnackbar: false});
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const validateNewEntryForm = () => {
        if(formValues.phone == '' && formValues.upi == '' && formValues.account == '') {
            return false
        }
        return true
    }

    const handleNewSubmitButton = () => {
        if(!validateNewEntryForm()) {
            setSnackbar({
                openSnackbar: true,
                type: 'error',
                message: 'One of the following should be set: Phone number, UPI or Account number'
            })
            return
        }
        fetch('http://localhost:4000/v1/info/addFraud', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "phone": formValues.phone,
                "upi": formValues.upi,
                "account_number": formValues.account,
                "comment": formValues.details,
                "entity_name": formValues.name,
                "region": {
                    "name": formValues.region,
                },
                "reported_by": {
                    "phone": formValues.r_phone,
                    "email": formValues.r_email
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                if(res._id != undefined) {
                    setSnackbar({
                        openSnackbar: true,
                        type: 'success',
                        message: 'Thanks for helping us out. Scam id: ' + res._id
                    })
                    handleCloseDialog()
                }
             })
    }

    function getFraudSearchResults() {
        if(searchInput.current.value == '') {
            setSnackbar({
                openSnackbar: true,
                type: 'error',
                message: 'Search query is empty'
            })
            return
        }
        fetch('http://localhost:4000/v1/info/findFraud', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "phone": searchInput.current.value,
                "upi": searchInput.current.value,
                "account_number": searchInput.current.value
            })
        })
            .then(res => res.json())
            .then(setSearchResults)
    }

    function renderSearchSummary() {
        let res = ''
        if(searchResults != undefined) {
            if(searchResults.length == 0) {
                res = <div className="result-summary result-summary-ok">
                    There are no reports for this search query in our database. <b>You should verify the entiity before making any transaction.</b>
                </div>
            } else if(searchResults.length == 1) {
                res = <div className="result-summary result-summary-fraud">
                    There is <b>1 report</b> against this search query.
                </div>
            } else if(searchResults.length > 1){
                res = <div className="result-summary result-summary-fraud">
                    There are <b>{searchResults.length} reports</b> against this search query.
                </div>
            }
            return res
        }
    }

    function renderSearchResult() {
        let res = []

        if(searchResults != undefined) {
            searchResults.forEach((r, idx) => {
                let d = new Date(r.date_added)
                res.push(
                    <TableRow key={idx}>
                        <TableCell align="right">{idx + 1}</TableCell>
                        <TableCell align="right">{d.toLocaleDateString() + ' ' + d.toLocaleTimeString('en-US')}</TableCell>
                        <TableCell align="right">{r.entity_name || 'Unknown entity '}</TableCell>
                        <TableCell align="right">{r.comment}</TableCell>
                    </TableRow>
                )
            })
        }

        return res
    }

    function renderTable() {
        if(searchResults != undefined && searchResults.length > 0) {
            return (
                <div className="result-list">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">#</TableCell>
                                <TableCell align="right">Date Reported</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderSearchResult()}
                        </TableBody>
                    </Table>
                </div>
            )
        } 
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <section className="Fraud">
            <div className="container">
                <img className="fraud-logo" src={FraudLogo} alt=""/>
                <h1>CoViD Scam Directory</h1>
                <p>This is an initiative to help you identify fraud entities.</p>
                <p className="click-link" onClick={handleClickOpenDialog}>Add a new record</p>
                <a href="https://github.com" className="click-link">API Access</a>
                <br/>
                <br/>
                <div className="search-bar">
                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            <TextField 
                                fullWidth={true} 
                                placeholder="Enter a phone number, account number or UPI ID" 
                                required={true} 
                                label="" 
                                variant="outlined" 
                                inputRef={searchInput}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="outlined" color="primary" onClick={getFraudSearchResults}>
                                GO
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                {renderSearchSummary()}
                {renderTable()}
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Scam Entry</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name of the scammer"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('name')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone number of the scammer"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('phone')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="account"
                        label="Account number of the scammer"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('account')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="upi"
                        label="UPI of the scammer"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('upi')}
                        fullWidth
                    />
                    <TextField
                        multiline
                        margin="dense"
                        id="details"
                        label="Details of the scam"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('details')}
                        fullWidth
                        rows={4}
                    />
                    <TextField
                        margin="dense"
                        id="region"
                        label="City"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('region')}
                        value={props.data.locationState.district}
                        fullWidth
                    />
                    <h6 className="personal-details" style={{marginTop: '30px', fontFamily: "Roboto"}}>Your details (Optional)</h6>
                    <DialogContentText>
                        These details will not be shared with the public but it might be used to file FIRs with the respective police department.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="r_email"
                        label="Your email"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('r_email')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="r_phone"
                        label="You phone"
                        type="text"
                        variant="outlined"
                        onChange={handleChangeForm('r_phone')}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleNewSubmitButton} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar.openSnackbar} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </section>
    );
}

const FraudTrans = withTranslation()(FraudComponent)

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function Fraud(props) {
    return (
        <Suspense fallback="loading">
        <FraudTrans data={props}/>
        </Suspense>
    );
}
