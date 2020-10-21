import React, {useState, useEffect} from 'react';
import HTTPWrapper from "../../utils/HTTPWrapper";
import {Redirect} from 'react-router-dom';
import './Profile.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import {DialogContent} from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Profile = () => {
    const [data, setData] = useState({email: '', name: ''});
    const [isAuth, setIsAuth] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [isChangeName, setIsChangeName] = useState(false);

    useEffect(() => {
        const axios = new HTTPWrapper();
        axios.get('/api/tager/user/profile')
            .then(res => {
                setData(res.data.data);
            })
    }, [isChangeName])

    const exit = () => {
        const axios = new HTTPWrapper();
        axios.post('api/tager/user/profile/logout')
            .then(() => {
                localStorage.removeItem('token');
                setIsAuth(false);
            })
    }

    const changePassword = () => {
        setOpenModal(true);
    }

    if (!isAuth) {
        return <Redirect to={'/oziapp'}/>
    }
    return (
        <React.Fragment>
            <div className={'profile-wrapper'}>
                <p>Email: {data.email}</p>
                <p>Name: {data.name}</p>
            </div>
            <div className={'profile-buttons'}>
                <button className={'profile-buttons_btn'} onClick={changePassword}>Change name</button>
                <button onClick={exit} className={'profile-buttons_btn exit-btn'}>Exit</button>
            </div>

            <Dialog onClose={() => {setOpenModal(false)}} aria-labelledby="customized-dialog-title"
                    open={openModal}>
                <DialogTitle id="customized-dialog-title" >
                    Modal title
                </DialogTitle>
                <DialogContent className={'dialog-content'} dividers>
                    <Typography>
                        <Formik
                            initialValues={{
                                text: '',
                            }}
                            validationSchema={Yup.object().shape({
                                newName: Yup.string()
                                    .min(4, 'Username must be at least 4 characters')
                                    .required('Field is required'),
                            })}
                            onSubmit={(fields: any) => {
                                setIsChangeName(false)
                                const fetch = new HTTPWrapper();
                                const dataToSend = {
                                    name: fields.newName,
                                    clientId: 1,
                                    email: data.email
                                }
                                fetch.put('api/tager/user/profile', dataToSend)
                                    .then((res) => {
                                        setIsChangeName(true);
                                        setOpenModal(false);
                                    })
                            }}
                            render={({ errors, touched }) => (
                                <Form>
                                    <label htmlFor="newName">New name</label>
                                    <Field name="newName" type="text" className={'form-control' + (errors.text && touched.text ? ' is-invalid' : '')} />
                                    <ErrorMessage name="newName" component="div" className="invalid-feedback" />

                                    <button type="submit" className="btn btn-primary changePassword-btn">Save</button>
                                </Form>
                            )}
                        />
                    </Typography>
                </DialogContent>
            </Dialog>
        </React.Fragment>

    )
}

export default Profile;