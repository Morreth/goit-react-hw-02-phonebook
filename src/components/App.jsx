import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = ({ name, number, id }) => {
    const contact = { id, name, number };

    this.state.contacts.find(contact => contact.name === name)
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  changeFilter = value => {
    this.setState({
      filter: value,
    });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(item => item.id !== id),
      };
    });
  };

  render() {
    const { contacts, name, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <Section title="Phonebook">
          <ContactForm handleAddContact={this.handleAddContact} />
        </Section>

        <Section title="Contacts">
          <Filter filter={filter} changeFilter={this.changeFilter} />
          <ContactList
            filteredContacts={filteredContacts}
            name={name}
            removeContact={this.removeContact}
          />
        </Section>
      </>
    );
  }
}
