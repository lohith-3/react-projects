import { Form, redirect, useLoaderData } from "react-router-dom";

import {
  getContactById,
  updateContactById,
} from "../../utils/contacts/firebase-contacts";

export const loader = async ({ params }) => {
  const contact = await getContactById(params.contactId);
  debugger;
  return { contact };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContactById(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

const EditContact = () => {
  const { contact } = useLoaderData();
  const { first, last, avatar, twitter } = contact;
  return (
    <Form method="post" id="contact-form">
      <p style={{ margin: "1rem" }}>
        <span>Name:</span>
        <input
          placeholder="first"
          type="text"
          name="first"
          aria-label="First Name"
          defaultValue={first}
        />
        <input
          placeholder="last"
          aria-label="Last Name"
          type="text"
          name="last"
          defaultValue={last}
        />
      </p>
      <label style={{ display: "block", margin: "1rem" }}>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={twitter}
        />
      </label>
      <label style={{ display: "block", margin: "1rem" }}>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={avatar}
        />
      </label>
      <p style={{ display: "block", margin: "1rem" }}>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
};

export default EditContact;
