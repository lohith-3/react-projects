import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";

import { getContacts, createContact } from "./utils/contacts/firebase-contacts";

import "./App.css";

export const loader = async () => {
  const contacts = await getContacts();
  return { contacts };
};

export const action = async () => {
  const contactId = await createContact();
  return redirect(`/contacts/${contactId}/edit`);
};

const App = () => {
  const { contacts } = useLoaderData();
  return (
    <div className="contacts-container">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => {
                return (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Contacts Found</p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
