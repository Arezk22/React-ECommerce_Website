import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const RegisterForm = () => {
  const { lang } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    [lang === "ar" ? "الاسم" : "name"]: "",
    [lang === "ar" ? "البريد الإلكتروني" : "email"]: "",
    [lang === "ar" ? "اسم المستخدم" : "userName"]: "",
    [lang === "ar" ? "كلمة المرور" : "password"]: "",
    [lang === "ar" ? "تأكيد كلمة المرور" : "confirmPassword"]: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // مسح الخطأ عند الكتابة
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex لليوزر نيم (يمنع المسافات ويقبل أرقام وحروف)
    const userNameRegex = /^\S*$/;

    if (!formData.name.trim())
      newErrors.name = lang === "ar" ? "يجب ادخال الاسم" : "Name required";

    if (!formData.email) {
      newErrors.email =
        lang === "ar" ? "يجب ادخال الايميل" : "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = lang === "ar" ? "" : "Invalid email format";
    }

    if (!formData.userName) {
      newErrors.userName =
        lang === "ar" ? "اسم المستخدم مطلوب" : "Username is required";
    } else if (!userNameRegex.test(formData.userName)) {
      newErrors.userName =
        lang === "ar" ? "" : "Username cannot contain spaces";
    }

    if (!formData.password) {
      newErrors.password =
        lang === "ar" ? "كلمة السر مطلوبه" : "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        lang === "ar" ? "" : "Password must be at least 8 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = lang === "ar" ? "" : "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Data Submitted:", formData);
      // تنفيذ عملية التسجيل هنا
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4">
            <h3 className="text-center mb-4">
              {lang === "ar" ? "إنشاء حساب" : "Create Account"}
            </h3>
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label> {lang === "ar" ? "الاسم" : "Name "}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={
                    lang === "ar" ? "ادخل الاسم كاملا" : "Enter your full name"
                  }
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Username */}
              <Form.Group className="mb-3">
                <Form.Label>
                  {lang === "ar" ? "اسم المستخدم" : "Username"}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="e.g. dev_mohamed"
                  value={formData.userName}
                  onChange={handleChange}
                  isInvalid={!!errors.userName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>
                  {lang === "ar" ? "كلمة المرور" : "Password"}
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder={
                    lang === "ar"
                      ? "يجب الا تقل كلمه المرور عن 8 حروف"
                      : "Min 8 characters"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-4">
                <Form.Label>
                  {lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder={
                    lang === "ar" ? "كرر كلمه المرور" : "Repeat your password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2">
                {lang === "ar" ? "تسجيل دخول" : "Register"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
