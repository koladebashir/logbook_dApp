import PropTypes from "prop-types";

export default function Form({ onSubmit, currentAccountId }) {
  return (
    <form onSubmit={onSubmit}>
      <span>Hi, {currentAccountId}</span>
      <fieldset id="fieldset">
        <label className="form-label" htmlFor="">
          <span style={{ color: "#117A65" }}>Enter Your Message</span>
          &nbsp;😁
        </label>
        <input
          className="form-control"
          id="message"
          type="text"
          placeholder="Example: Going home for the weekend..."
          style={{ marginBottom: 15 }}
          required
        />
        <label
          className="form-label"
          htmlFor="donation"
          style={{ paddingRight: 37, marginRight: 0 }}
        >
          <span style={{ color: "#117A65" }}>
            Add A Token (Optional)
          </span>
        </label>
        <input
          className="form-control"
          type="number"
          id="donation"
          min={0}
          defaultValue={0}
          style={{ display: "inline", width: "25%" }}
          step="0.1"
        />
        <input
          className="btn btn-primary"
          type="submit"
          style={{
            background: "var(--bs-gray-800)",
            marginTop: 15,
            display: "block",
          }}
        />
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentAccountId: PropTypes.string.isRequired,
};
