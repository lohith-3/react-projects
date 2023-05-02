import { Form, useParams } from "react-router-dom";

const Contact = () => {
  const { contactId } = useParams();
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };
  return (
    <div id="contact">
      <div>
        <img src={contact.avatar} alt={`${contact.first}${contact.last}`} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first}
              {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}
          <Favorite contact={contact} />{" "}
        </h1>
        {contactId && <p>{contactId}</p>}
        {contact.twitter && (
          <p style={{ marginTop: "1rem" }}>
            <a target="#" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Form action="edit">
            <button
              type="submit"
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            >
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              // eslint-disable-next-line no-restricted-globals
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form
      method="post"
      style={{ display: "inline-block", marginLeft: "0.5rem" }}
    >
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export default Contact;
