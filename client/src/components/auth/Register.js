import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector, useDispatch } from "react-redux";

const Register = history => {
  // Use of useState ()
  //Allows us to get the state from the Redux store. This hook will be used to replace mapStateToProps in connect().
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const auth = useSelector(state => state.auth);
  const errorsSelector = useSelector(state => state.errors);

  const { isAuthenticated } = auth;
  // Use of useDispatch(). Allows us to dispatch out redux actions. This hook will be used to replace mapDispatchToProps in connect().
  const dispatch = useDispatch();

  // use of useEffect instead of life circle methods like component componentDidMount
  useEffect(() => {
    if (isAuthenticated) {
      // if the user is authenticated, go to dashboard
      history.push("/dashboard");
    }
    if (errorsSelector) {
      console.log("errors: " + JSON.stringify(errorsSelector));
      setErrors(errorsSelector);
    }
    //In this array, specify the props that can change. React will execute the effect if any props changes.
  }, [errorsSelector]);

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2
    };

    console.log(newUser);
    dispatch(registerUser(newUser, history));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name}
              />
              <TextFieldGroup
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <TextFieldGroup
                name="password2"
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                error={errors.password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
