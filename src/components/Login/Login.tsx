import React from 'react';
import {Redirect} from 'react-router-dom';
import * as Yup from "yup";
import HTTPWrapper from "../../utils/HTTPWrapper";
import './Login.css';

import { Formik, Field, Form, ErrorMessage } from 'formik';

export default class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAuth: false,
            isError: false,
        }
    }
    render() {

        if (this.state.isAuth || localStorage.getItem('token')) {
            return <Redirect to={'/profile'}/>
        }

        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(4, 'Password must be at least 4 characters')
                        .required('Password is required'),
                })}
                onSubmit={(fields: any) => {
                    this.setState({isError: false});
                    const fetch = new HTTPWrapper();
                    const data = {
                        email: fields.email,
                        password: fields.password,
                        clientId: 1,
                    }

                    fetch.post('api/auth/user', data)
                        .then(res => {
                            localStorage.setItem('token', res.data.data.tokenType + ' ' + res.data.data.accessToken)
                        })
                        .then(() => {
                            this.setState({isAuth: true})
                        })
                        .catch(() => {
                            this.setState({isError: true})
                        })
                }}
                render={({ errors, touched }) => (
                    <Form className={'form-login'}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>

                        {this.state.isError ? <p className={'error-message'}>Data is invalid!</p> : ''}

                        <div className="form-group form-group_button">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}
