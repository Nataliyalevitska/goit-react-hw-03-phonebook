import React from "react";
import PropTypes from "prop-types";
import { ContactsItems,ContactsLi,ButtonContact} from './ContactList.styled';


const ContactList = ({ lists, onClick }) => {
  return (
    <>
      <ContactsItems>
        {lists.map(({ name, number, id }) => (
          <ContactsLi key={id}>
            {name}: {number}
            <ButtonContact type="button" id={id} onClick={onClick}>
              delete
            </ButtonContact>
          </ContactsLi>
        ))}
      </ContactsItems>
    </>
  );
};

ContactList.propTypes = {
  lists: PropTypes.array,
};

export default ContactList;