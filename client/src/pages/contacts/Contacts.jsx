import "./Contacts.css";

function Contacts() {
  return (
    <div className="contacts">
      <div className="contacts__header">
        <span className="contacts__title">Contact us</span>
      </div>
      <div className="contacts__container">
        <div className="contacts__card">
          <span className="contacts__card-title">Press</span>
          <p className="contacts__card-content">
            Enim ut sem viverra aliquet eget sit amet tellus. Amet purus gravida
            quis blandit turpis cursus. Nunc mi ipsum faucibus vitae aliquet
            nec. Ut faucibus pulvinar elementum integer enim neque volutpat.
            Fames ac turpis egestas sed tempus.
          </p>
          <button className="contacts__card-btn">View Press Page</button>
        </div>
        <div className="contacts__card">
          <span className="contacts__card-title">Help & Support</span>
          <p className="contacts__card-content">
            Enim tortor at auctor urna nunc id. Pulvinar neque laoreet
            suspendisse interdum consectetur libero id faucibus. A diam maecenas
            sed enim.
          </p>
          <button className="contacts__card-btn">View Support Page</button>
        </div>
        <div className="contacts__card">
          <span className="contacts__card-title">Sales</span>
          <p className="contacts__card-content">
            {" "}
            Consequat interdum varius sit amet mattis vulputate enim nulla
            aliquet. Tellus in hac habitasse platea. Molestie nunc non blandit
            massa enim nec. Massa tincidunt dui ut ornare.
          </p>
          <button className="contacts__card-btn">View sales</button>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
