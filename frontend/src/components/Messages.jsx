import PropTypes from "prop-types";

export default function Messages({ messages }) {
  return (
    <div style={{ background: "rgb(247, 247, 249)" }}>
      {messages.map(({ text, premium, sender }, i) => (
        <>
          <div
            key={i}
            className={`row ${premium ? "is-premium" : ""}`}
            style={{
              borderRadius: 5,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <div className="col-md-12">
              <p style={{textTransform: "capitalize"}}>{text}</p>
            </div>
            <div className="col-md-12 text-start">
              <span>
                <strong>Sent By: {sender}</strong>
              </span>
            </div>
          </div>
          <hr style={{ width: "95%", margin: "0 auto" }} />
        </>
      ))}
    </div>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
};
