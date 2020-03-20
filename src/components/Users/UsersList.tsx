import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

type UsersProps = {
  users: string[];
  selectedName: string | null;
  selectUser: (name: string) => void;
};

type UsersState = {
  sortedNames: string[];
};

export default class UsersList extends React.Component<UsersProps> {
  state: UsersState = {
    sortedNames: []
  };

  static getDerivedStateFromProps(props: UsersProps, state: UsersState) {
    const sortedNames = props.users.slice().sort();
    return {
      sortedNames
    };
  }

  render() {
    const { selectedName, selectUser } = this.props;
    const { sortedNames } = this.state;

    return (
      <List aria-label="users">
        {sortedNames.map((name: string) => (
          <ListItem
            button
            onClick={() => selectUser(name)}
            key={name}
            divider
            selected={selectedName === name}
          >
            {name}
          </ListItem>
        ))}
      </List>
    );
  }
}
