import propTypes from "prop-types";

export default function Navbar({ isSignedIn, wallet }) {
  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };
  return (
    <div className="container">
      <div className="row" style={{ paddingTop: 0, marginTop: 20 }}>
        <div className="col-md-6 align-self-center">
          <h1 className="text-start">
            <span style={{ color: "#117A65" }}>OWT LOGBOOK</span>
          </h1>
        </div>
        <div className="col-md-6 text-end align-self-center">
          {isSignedIn ? (
            <button
              className="btn btn-primary"
              type="button"
              style={{ background: "var(--bs-gray-800)" }}
              onClick={signOut}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              style={{ background: "var(--bs-gray-800)" }}
              onClick={signIn}
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  isSignedIn: propTypes.bool,
  wallet: propTypes.object,
};
