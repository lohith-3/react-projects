import { redirect } from "react-router-dom";
import { deleteContactById } from "../../utils/contacts/firebase-contacts";

export const action = ({ params }) => {
  deleteContactById(params.contactId);

  return redirect("/");
};

const Destroy = () => {
  return (
    <>
      <div>Oops! There was an error.</div>
    </>
  );
};

export default Destroy;
