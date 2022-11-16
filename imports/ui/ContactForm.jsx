import React, { useState } from "react"
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();

  const saveContact = () => {
    const contact = { name, email, image };
    ContactsCollection.insert(contact)
    console.log(contact);
    setName("");
    setEmail("");
    setImage("");
  }
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} id="name" />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" />
      </div>
      <div>
        <label htmlFor="imageURL">Image</label>
        <input type="text" onChange={(e) => setImage(e.target.value)} id="imageURL" />
      </div>
      <div>
        <button onClick={saveContact} >Save Contact</button>
      </div>
    </form>
  )
}