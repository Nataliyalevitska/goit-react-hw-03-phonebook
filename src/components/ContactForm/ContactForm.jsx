import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  PhoneLabel,
  PhoneInput,
  ButtonContact,
  PhoneForm,
} from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const isDuplicate = this.checkIfDuplicate();
    if (isDuplicate) {
      return alert(`${this.state.name} already exist in your contacts!`);
    }
    this.props.onSubmit({ ...this.state, id: nanoid(3) });
    this.reset();
  };
  checkIfDuplicate = () =>
    this.props.allContacts.some(({ name }) => name === this.state.name);

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    const { handleChange, state, handleSubmit } = this;
    const { name, number } = state;
    const isBtnDis = Object.values(this.state).some(value => {
      return !value;
    });
    return (
      <PhoneForm onSubmit={handleSubmit}>
        <PhoneLabel>
          Name
          <PhoneInput
            type="text"
            name="name"
            value={name}
            placeholder="*Enter name"
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title=" Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan "
            required
          />
        </PhoneLabel>
        <PhoneLabel>
          Number
          <PhoneInput
            type="tel"
            name="number"
            value={number}
            placeholder="*Enter phone"
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title=" Phone number must be digits and can contain spaces, dashes, parentheses and can start with + "
            required
          />
        </PhoneLabel>
        <ButtonContact type="submit" disabled={isBtnDis}>
          Add contact
        </ButtonContact>
      </PhoneForm>
    );
  }
}

export default ContactForm;
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
