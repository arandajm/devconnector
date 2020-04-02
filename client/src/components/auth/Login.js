import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Login = ({ history }) => {
  // Use of useState()
  //Allows us to get the state from the Redux store. This hook will be used to replace mapStateToProps in connect().
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  }, [errorsSelector, auth.isAuthenticated]);

  const onSubmit = e => {
    e.preventDefault();
    const guestUser = {
      email,
      password
    };
    dispatch(loginUser(guestUser));
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
