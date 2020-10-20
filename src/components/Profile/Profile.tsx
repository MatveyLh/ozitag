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
    const [isChangePassword, setIsChangePassword] = useState(false);

    useEffect(() => {
        const axios = new HTTPWrapper();
        axios.get('/api/tager/user/profile')
            .then(res => {
                setData(res.data.data);
            })
    }, [])

    const exit = () => {
        const axios = new HTTPWrapper();
        axios.post('api/tager/user/profile/logout')
            .then(() => {
                localStorage.removeItem('token');
                setIsAuth(false);
            })
    }

    const changePassword = () => {
        setIsChangePassword(true);
    }

    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }
    return (
        <React.Fragment>
            <div className={'profile-wrapper'}>
                <p>Email: {data.email}</p>
                <p>Name: {data.name}</p>
            </div>
            <div className={'profile-buttons'}>
                <button className={'profile-buttons_btn'} onClick={changePassword}>Изменить пароль</button>
                <button onClick={exit} className={'profile-buttons_btn exit-btn'}>Выйти</button>
            </div>

            <Dialog onClose={() => {setIsChangePassword(false)}} aria-labelledby="customized-dialog-title"
                    open={isChangePassword}>
                <DialogTitle id="customized-dialog-title" >
                    Modal title
                </DialogTitle>
                <DialogContent style={{width: '600px'}} dividers>
                    <Typography>
                        <Formik
                            initialValues={{
                                oldPassword: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                oldPassword: Yup.string()
                                    .min(4, 'Password must be at least 4 characters')
                                    .required('Old password is required'),
                                password: Yup.string()
                                    .min(4, 'Password must be at least 4 characters')
                                    .required('New password is required'),
                            })}
                            onSubmit={(fields: any) => {
                                const data = {
                                    oldPassword: fields.oldPassword,
                                    password: fields.password,
                                    clientId: 1,
                                }
                                console.log(data)
                            }}
                            render={({ errors, touched }) => (
                                <Form>
                                    <label htmlFor="oldPassword">Old password</label>
                                    <Field name="oldPassword" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="oldPassword" component="div" className="invalid-feedback" />


                                    <label htmlFor="password">New Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                    <button type="submit" className="btn btn-primary changePassword-btn">Login</button>
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