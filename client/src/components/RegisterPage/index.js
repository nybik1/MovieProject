import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "./../../app/movies/actions/user_actions";
import { useDispatch } from "react-redux";
import s from './style.module.scss';

import {
    Form,
    Input,
} from 'antd';




const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};




function RegisterPage(props) {
    const [avatar, setAvatar] = React.useState('');
    const defaultAvatar = 'https://via.placeholder.com/150'


    const handleChangeImage = (evt) => {
        console.log("Uploading");
        const reader = new FileReader();
        const file = evt.target.files[0];

        reader.onload = function (upload) {
            setAvatar(upload.target.result)
        };
        reader.readAsDataURL(file);
    };


    const dispatch = useDispatch();


    return (

        <Formik
            initialValues={{
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .required('Username is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        username: values.username,
                        image: avatar ? avatar.base64 : `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                    };

                    dispatch(registerUser(dataToSubmit)).then(response => {
                        if (response.payload.success) {
                            props.history.push("/");
                        } else {
                            alert(response.payload.err.errmsg)
                        }
                    })

                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className={s.formWrapper}>
                        <h2>Sign up</h2>
                        <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                            <Form.Item required label="Username">
                                <Input
                                    id="username"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Item>


                            <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Confirm" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Enter your confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <div className={s.chooseAvatar__wrapper}>
                                <input type="file" id='avatar' className={s.input__avatar} onChange={handleChangeImage} />
                                <label className={s.label__avatar} htmlFor='avatar'>Choose avatar</label>
                                <img src={avatar ? avatar : defaultAvatar} alt='Choose your avatar'></img>
                            </div>

                            <button className={s.registerSubmit} onClick={handleSubmit} type='submit' disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};


export default RegisterPage
