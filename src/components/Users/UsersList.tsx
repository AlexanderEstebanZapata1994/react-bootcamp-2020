import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

type UsersProps = {
  classes?: any;
  users: string[];
  selectedName: string | null;
  selectUser: (name: string) => void;
};

type UsersState = {
  sortedNames: string[];
};

class UsersList extends React.Component<UsersProps> {
  private listRef = React.createRef<HTMLDivElement>();
  state: UsersState = {
    sortedNames: []
  };

  static getDerivedStateFromProps(props: UsersProps, state: UsersState) {
    const sortedNames = props.users.slice().sort();
    return {
      sortedNames
    };
  }

  getSnapshotBeforeUpdate(prevProps: UsersProps, prevState: UsersState) {
    if (prevProps.users.length < this.props.users.length) {
      const list = this.listRef.current;
      if (list) {
        console.log(list.scrollHeight - list.scrollTop);
        return list.scrollHeight - list.scrollTop;
      }
    }
    return null;
  }

  componentDidUpdate(
    prevProps: UsersProps,
    prevState: UsersState,
    snapshot: number
  ) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      if (list) {
        list.scrollTop = list.scrollHeight - snapshot;
      }
    }
  }

  render() {
    const { selectedName, selectUser, classes } = this.props;
    const { sortedNames } = this.state;
    return (
      <div className={classes.root} ref={this.listRef}>
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
      </div>
    );
  }
}

const styles = {
  root: {
    height: "400px",
    overflow: "scroll"
  }
};

export default withStyles(styles)(UsersList);
