import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function LoginModal(props) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: "", password: "", msg: "" });
  const [pass, setPass] = useState(true);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const togglePass = e => {
    e.preventDefault();
    setPass(prevState => !prevState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(clearErrors());

    const { email, password } = input;

    const newUser = {
      email,
      password,
    };
    dispatch(login(newUser));
  };

  const closeModal = () => {
    props.handleCloseModal();
    dispatch(clearErrors());
    setInput({ email: "", password: "" });
  };

  const error = useSelector(state => state.error.msg.msg);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated]);

  return (
    <>
      <ReactModal
        isOpen={props.modal}
        contentLabel="Minimal Modal Example"
        className="modal"
        overlayClassName="overlay"
      >
        <form>
          <h3>Login</h3>
          {error ? (
            <span style={{ color: "red" }}>*{error.toUpperCase()}</span>
          ) : null}
          <br />
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
          <br />
          <div>
            <input
              type={pass ? "password" : "text"}
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
            <br />
            <button className="show" onClick={togglePass}>
              <i class={pass ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
          <input type="submit" value="Login" onClick={handleSubmit} />
          <button className="close" onClick={closeModal}>
            <i class="fas fa-times"></i>
          </button>
        </form>
      </ReactModal>
    </>
  );
}

export default LoginModal;
