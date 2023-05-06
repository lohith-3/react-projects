import { Form, useParams, useLoaderData } from "react-router-dom";

import { getContactById } from "../../utils/contacts/firebase-contacts";

export const loader = async ({ params }) => {
  const contact = await getContactById(params.contactId);
  return { contact };
};

const Contact = () => {
  const { contact } = useLoaderData();

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
