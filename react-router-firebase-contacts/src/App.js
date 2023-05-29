import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
} from "react-router-dom";

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
  const navigation = useNavigation();
  return (
    <div className="contacts-container">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post" style={{ flex: " 1 1 auto" }}>
            <button type="submit" style={{ width: "100%" }}>
              New
            </button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => {
                return (
                  <li key={contact.id}>
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Contacts Found</p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
