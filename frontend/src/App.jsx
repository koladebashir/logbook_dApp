import { useEffect, useState } from "react";
import { Wallet } from "./services/near-wallet";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";
import { utils } from "near-api-js";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Loader from "./components/Loader";

const CONTRACT_NAME = "kolade-dev.testnet";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME });

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();
      const messages = await getLast10Messages();

      setIsSignedIn(isSignedIn);
      setMessages(messages.reverse());
    };
    initFunction();
  }, []);

  const getLast10Messages = async () => {
    const total_messages = await wallet.viewMethod({
      contractId: CONTRACT_NAME,
      method: "total_messages",
    });
    const from_index = total_messages >= 10 ? total_messages - 10 : 0;
    return wallet.viewMethod({
      contractId: CONTRACT_NAME,
      method: "get_messages",
      args: { from_index: String(from_index), limit: "10" },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // Add message to the log book
    const deposit = utils.format.parseNearAmount(donation.value);
    await wallet.callMethod({
      contractId: CONTRACT_NAME,
      method: "add_message",
      args: { text: message.value },
      deposit,
    });

    // Get updated messages
    const messages = await getLast10Messages();
    setMessages(messages.reverse());
    setLoading(false);

    message.value = "";
    donation.value = "0";
    fieldset.disabled = false;
    message.focus();
  };

  return (
    <main>
      <Navbar isSignedIn={isSignedIn} wallet={wallet} />
      <div className="container py-4 py-xl-5">
        {isSignedIn ? (
          <>
            <div className="row mb-5">
              <div className="col-md-8 col-xl-6 text-center mx-auto">
                <SearchBox
                  value={search}
                  onChange={handleSearch}
                  onSubmit={() => {}}
                />
              </div>
            </div>
            <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
          </>
        ) : (
          <SignIn />
        )}
        <hr />
        <div
          className="dropend"
          style={{
            margin: "12.5px 0px",
            background: "var(--bs-btn-disabled-color)",
          }}
        >
          <button
            className="btn btn-primary dropdown-toggle"
            aria-expanded="false"
            data-bs-toggle="dropdown"
            type="button"
            style={{
              background: "var(--bs-body-bg)",
              color: "#117A65",
              fontSize: 16,
            }}
          >
            FILTER BY&nbsp;
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Time Sent
            </a>
            <a className="dropdown-item" href="#">
              Tokens Donated
            </a>
          </div>
        </div>
        {!loading ? (
          !!messages.length && <Messages messages={messages} />
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
}

export default App;
