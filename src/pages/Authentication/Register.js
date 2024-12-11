import React, { useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

const Register = () => {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validation = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your First Name"),
      middleName: Yup.string().required("Please Enter Your Middle Name"),
      lastName: Yup.string().required("Please Enter Your Last Name"),
      email: Yup.string().email("Invalid email format").required("Please Enter Your Email"),
      mobile: Yup.string().required("Please Enter Your Mobile Number"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://app.cirtkenya.com/api/v1/auth/signup", values);
        setSuccessMessage("Registration successful! Redirecting to login...");
        setApiError("");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setApiError(error.response?.data?.message || "Registration failed. Please try again.");
        setSuccessMessage("");
      }
    },
  });

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Skote account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logoImg} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {successMessage && <Alert color="success">{successMessage}</Alert>}
                      {apiError && <Alert color="danger">{apiError}</Alert>}

                      <div className="mb-3">
                        <Label className="form-label">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Enter first name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName}
                          invalid={validation.touched.firstName && validation.errors.firstName}
                        />
                        {validation.touched.firstName && validation.errors.firstName && (
                          <FormFeedback>{validation.errors.firstName}</FormFeedback>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Middle Name</Label>
                        <Input
                          id="middleName"
                          name="middleName"
                          type="text"
                          placeholder="Enter middle name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.middleName}
                          invalid={validation.touched.middleName && validation.errors.middleName}
                        />
                        {validation.touched.middleName && validation.errors.middleName && (
                          <FormFeedback>{validation.errors.middleName}</FormFeedback>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Enter last name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName}
                          invalid={validation.touched.lastName && validation.errors.lastName}
                        />
                        {validation.touched.lastName && validation.errors.lastName && (
                          <FormFeedback>{validation.errors.lastName}</FormFeedback>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email}
                          invalid={validation.touched.email && validation.errors.email}
                        />
                        {validation.touched.email && validation.errors.email && (
                          <FormFeedback>{validation.errors.email}</FormFeedback>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mobile</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="text"
                          placeholder="Enter mobile number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile}
                          invalid={validation.touched.mobile && validation.errors.mobile}
                        />
                        {validation.touched.mobile && validation.errors.mobile && (
                          <FormFeedback>{validation.errors.mobile}</FormFeedback>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password}
                          invalid={validation.touched.password && validation.errors.password}
                        />
                        {validation.touched.password && validation.errors.password && (
                          <FormFeedback>{validation.errors.password}</FormFeedback>
                        )}
                      </div>

                      <div className="mt-4">
                        <button className="btn btn-primary btn-block" type="submit">
                          Register
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Login
                  </Link>
                </p>
                <p>
                  © {new Date().getFullYear()} GC. Crafted with <i className="mdi mdi-heart text-danger" /> by Game
                  Connect
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;